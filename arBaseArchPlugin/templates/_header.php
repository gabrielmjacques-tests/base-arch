<!-- Botão para pular a navegação e ir direto para o conteúdo principal da página -->
<a href="#main-column" class="pular-para-conteudo" aria-label="Pular para o conteúdo principal">Pular para o
	conteúdo principal</a>

<div id="barra-brasil" style="background:#7F7F7F; height: 20px; padding:0 0 0 10px;display:block;">
	<ul id="menu-barra-temp" style="list-style:none;">
		<li style="display:inline; float:left;padding-right:10px; margin-right:10px; border-right:1px solid #EDEDED">
			<a href="http://brasil.gov.br"
				style="font-family:sans,sans-serif; text-decoration:none; color:white;">Portal do Governo Brasileiro</a>
		</li>
		<li>
			<a style="font-family:sans,sans-serif; text-decoration:none; color:white;"
				href="http://epwg.governoeletronico.gov.br/barra/atualize.html">Atualize sua Barra de Governo</a>
		</li>
	</ul>
</div>
<script defer="defer" src="//barra.brasil.gov.br/barra.js" type="text/javascript"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
	integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
	crossorigin="anonymous" referrerpolicy="no-referrer" />


<script type="text/javascript">
	Shadowbox.init();
</script>
<?php echo get_component('default', 'updateCheck') ?>

<header id="top-bar">

	<?php
	/** CUSTOMIZAÇÃO COC 
	 *** Data: 20141006 - Atualizado em: 2021-05-19
	 *** Responsável: STI COC
	 *** e-mail: sistemasti@coc.fiocruz.br
	 *** Ações: Inclusão de estrutura para abrigar o banner da base arch, que contém link para o Portal COC
	 */
	?>

	<div id="header-logo"> <?php //customização 
							?>

		<?php if (sfConfig::get('app_toggleLogo')): ?>
			<div id="logo-coc"> <?php //customização 
								?>

				<?php echo link_to('<span class="escondidinho">Portal COC</span>', 'http://www.coc.fiocruz.br', array('id' => 'logo', 'title' => 'Vai para o Portal da COC', 'target' => '_blank')) ?>

			</div> <?php //customização 
					?>
		<?php endif; ?>




		<?php if (sfConfig::get('app_toggleTitle')): ?>
			<span id="site-name">
				<?php echo link_to('<span>' . sfConfig::get('app_siteTitle') . '</span>', '@homepage', array('rel' => 'home', 'title' => __('Home'))) ?>
			</span>
		<?php endif; ?>
	</div> <?php //customização 
			?>

	<nav class="menu-secundario">

		<?php echo get_component('menu', 'quickLinksMenu') ?>

		<?php echo get_component('menu', 'clipboardMenu') ?>

		<?php echo get_component('menu', 'userMenu') ?>

		<?php //echo get_component('menu', 'changeLanguageMenu') 
		?>

		<?php echo get_component('menu', 'mainMenu', array('sf_cache_key' => $sf_user->getCulture() . $sf_user->getUserID())) ?>

	</nav>

	<?php echo get_component_slot('header') ?>

</header>

<!--FORMULÁRIO DE PESQUISA COC-->
<!-- <div>
	<a href="https://forms.office.com/Pages/ResponsePage.aspx?id=piE3vGGAGU6jtDHiCT4gmntH0MsB6QFBmkJyb_gsbGpUMDJXUlQ1TEc2MzFUQVVRME00S0hDM0tVRC4u" target="_blank" class="pesquisa">Pesquisa</a>
</div> -->
<!--FIM DO FORMULÁRIO DE PESQUISA COC -->

<?php if (sfConfig::get('app_toggleDescription')): ?>
	<div id="site-slogan">
		<div class="container">
			<div class="row">
				<div class="span12">
					<span><?php echo sfConfig::get('app_siteDescription') ?></span>
				</div>
			</div>
		</div>
	</div>
<?php else: ?>
	<div id="site-slogan">
		<div id="search-bar">
			<?php echo get_component('search', 'box') ?>

		</div>
	</div>

<?php endif; ?>

<?php echo get_component('menu', 'browseMenu', array('sf_cache_key' => $sf_user->getCulture() . $sf_user->getUserID())) ?>