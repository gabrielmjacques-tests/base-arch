<footer>

	<?php if (QubitAcl::check('userInterface', 'translate')): ?>
		<?php echo get_component('sfTranslatePlugin', 'translate') ?>
	<?php endif; ?>

	<?php echo get_component_slot('footer') ?>

	<div id="print-date">
		<?php echo __('Printed: %d%', array('%d%' => date('Y-m-d'))) ?>
	</div>

</footer>

<?php $gaKey = sfConfig::get('app_google_analytics_api_key', '') ?>
<?php if (!empty($gaKey)): ?>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $gaKey; ?>"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', '<?php echo $gaKey; ?>');
	</script>

<?php endif; ?>