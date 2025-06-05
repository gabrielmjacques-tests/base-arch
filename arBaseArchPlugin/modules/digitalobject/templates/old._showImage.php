<?php
// Variáveis utilizadas para o sistema de geração de descrições de imagens
$hasImageDescription = $resource->getDigitalObjectAltText() != '';
$currentUrl = sfContext::getInstance()->getRequest()->getUri();
$isEditPage = strpos($currentUrl, '/edit') !== false;
?>

<?php use_helper('Text'); ?>

<?php if (QubitTerm::MASTER_ID == $usageType || QubitTerm::REFERENCE_ID == $usageType) { ?>

<?php if (isset($link)) { ?>
<?php echo link_to(image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: '')]), $link, ['target' => '_blank']); ?>

<?php if (!$hasImageDescription): ?>
<button id="descricao-btn">Descrever Imagem</button> <!-- Botão para gerar descrição de imagem -->

<!-- Descrição de imagem -->
<span aria-live="polite" id="descricao-imagem" class="descricao-ia"></span>
<?php endif ?>

<?php } else { ?>
<?php echo image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Original %1% not accessible', ['%1%' => sfConfig::get('app_ui_label_digitalobject')])]); ?>
<?php } ?>

<?php } elseif (QubitTerm::THUMBNAIL_ID == $usageType) { ?>

<?php if ($iconOnly) { ?>
<?php if (isset($link)) { ?>
<?php echo link_to(image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Open original %1%', ['%1%' => sfConfig::get('app_ui_label_digitalobject')])]), $link); ?>
<?php } else { ?>
<?php echo image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Original %1% not accessible', ['%1%' => sfConfig::get('app_ui_label_digitalobject')])]); ?>
<?php } ?>

<?php } else { ?>

<div class="digitalObject">

    <div class="digitalObjectRep">
        <?php if (isset($link)) { ?>
        <?php echo link_to(image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Open original %1%', ['%1%' => sfConfig::get('app_ui_label_digitalobject')])]), $link); ?>
        <?php } else { ?>
        <?php echo image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Original %1% not accessible', ['%1%' => sfConfig::get('app_ui_label_digitalobject')])]); ?>
        <?php } ?>
    </div>

    <div class="digitalObjectDesc">
        <?php echo wrap_text($resource->name, 18); ?>
    </div>

</div>

<?php } ?>

<?php } ?>

<?php
// Só executa o script se não estiver na página de edição
if (!$isEditPage && !$hasImageDescription) {
?>
<script defer>
if (document.getElementById('descricao-btn')) {
    const descricaoBtn = document.getElementById('descricao-btn');

    // Adiciona evento de clique ao botão
    descricaoBtn.addEventListener('click', async () => {
        // Obtém elementos necessários
        const descricaoImagem = document.getElementById('descricao-imagem')
        const imgElement = document.querySelector('.digital-object-reference img');

        // Chama função para exibir descrição com animação
        exibirDescricaoComAnimacao(descricaoImagem, imgElement, true)
            .then((result) => {
                // Atualiza texto do botão baseado no resultado
                descricaoBtn.textContent = result ? 'Gerar Descrição Novamente' : 'Tentar Novamente';
            });
    })
}
</script>
<?php } ?>