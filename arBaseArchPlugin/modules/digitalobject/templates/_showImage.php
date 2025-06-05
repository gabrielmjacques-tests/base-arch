<?php
// Verifica se há uma descrição alternativa de imagem
$hasImageDescription = $resource->getDigitalObjectAltText() != '';

// Verifica se a URL atual corresponde a uma página de edição
$currentUrl = sfContext::getInstance()->getRequest()->getUri();
$isEditPage = strpos($currentUrl, '/edit') !== false;
?>

<?php use_helper('Text'); ?>

<?php
// Verifica se o tipo de uso da imagem é "MASTER" ou "REFERENCE"
if (QubitTerm::MASTER_ID == $usageType || QubitTerm::REFERENCE_ID == $usageType):
?>

<?php
  // Verifica se existe um link definido para a imagem
  if (isset($link)):
  ?>
<!-- Exibe imagem como link (abre em nova aba) -->
<?php echo link_to(
      image_tag($representation->getFullPath()),
      $link,
      ['target' => '_blank']
    ); ?>

<!-- Exibe botão para gerar descrição se não houver descrição prévia -->
<?php if (!$hasImageDescription): ?>
<button id="descricao-btn">Descrever Imagem</button>
<?php endif; ?>

<!-- Elemento onde será exibida a descrição gerada -->
<span aria-live="polite" id="descricao-imagem" class="descricao-ia">
    <?php echo $resource->getDigitalObjectAltText() ?: "" ?>
</span>

<?php else: ?>
<!-- Exibe apenas a imagem (sem link) com alt adequado -->
<?php echo image_tag(
      $representation->getFullPath(),
      ['alt' => __(
        $resource->getDigitalObjectAltText() ?: 'Original %1% not accessible',
        ['%1%' => sfConfig::get('app_ui_label_digitalobject')]
      )]
    ); ?>
<?php endif; ?>

<?php
// Caso o tipo de uso da imagem seja "THUMBNAIL"
elseif (QubitTerm::THUMBNAIL_ID == $usageType):
?>
<?php
  // Verifica se deve exibir apenas o ícone (sem layout mais elaborado)
  if ($iconOnly):
  ?>
<?php if (isset($link)): ?>
<!-- Exibe ícone clicável com link -->
<?php echo link_to(
        image_tag($representation->getFullPath(), [
          'alt' => __(
            $resource->getDigitalObjectAltText() ?: 'Open original %1%',
            ['%1%' => sfConfig::get('app_ui_label_digitalobject')]
          )
        ]),
        $link
      ); ?>
<?php else: ?>
<!-- Exibe ícone simples -->
<?php echo image_tag(
        $representation->getFullPath(),
        ['alt' => __(
          $resource->getDigitalObjectAltText() ?: 'Original %1% not accessible',
          ['%1%' => sfConfig::get('app_ui_label_digitalobject')]
        )]
      ); ?>
<?php endif; ?>

<?php else: ?>
<!-- Exibe layout completo com imagem e descrição -->
<div class="digitalObject">
    <div class="digitalObjectRep">
        <?php if (isset($link)): ?>
        <?php echo link_to(
            image_tag($representation->getFullPath(), [
              'alt' => __(
                $resource->getDigitalObjectAltText() ?: 'Open original %1%',
                ['%1%' => sfConfig::get('app_ui_label_digitalobject')]
              )
            ]),
            $link
          ); ?>
        <?php else: ?>
        <?php echo image_tag(
            $representation->getFullPath(),
            ['alt' => __(
              $resource->getDigitalObjectAltText() ?: 'Original %1% not accessible',
              ['%1%' => sfConfig::get('app_ui_label_digitalobject')]
            )]
          ); ?>
        <?php endif; ?>
    </div>

    <!-- Exibe nome do recurso com quebra de texto -->
    <div class="digitalObjectDesc">
        <?php echo wrap_text($resource->name, 18); ?>
    </div>
</div>
<?php endif; ?>
<?php endif; ?>

<?php
// Insere o script somente se NÃO for página de edição e se não houver descrição ainda
if (!$isEditPage && !$hasImageDescription):
?>
<script defer>
if (document.getElementById('descricao-btn')) {
    const descricaoBtn = document.getElementById('descricao-btn');

    // Adiciona evento ao botão que chama função de descrição com IA
    descricaoBtn.addEventListener('click', async () => {
        const descricaoImagem = document.getElementById('descricao-imagem');
        const imgElement = document.querySelector('.digital-object-reference img');

        exibirDescricaoComAnimacao(descricaoImagem, imgElement, true)
            .then((result) => {
                descricaoBtn.textContent = result ?
                    'Gerar Descrição Novamente' :
                    'Tentar Novamente';
            });
    });
}
</script>
<?php endif; ?>