<div class="sort-header"<?php if (!empty($class)) { ?> class="<?php echo $class; ?>"<?php } ?>>
  <div class="sort-options">

    <label><?php echo $sf_data->getRaw('label'); ?>:</label>

    <div class="dropdown" tabindex="0">

      <div class="dropdown-selected">
        <?php $options = $sf_data->getRaw('options'); ?>
        <?php $param = $sf_data->getRaw('param'); ?>
        <?php if (isset($sf_request->{$param}, $options[$sf_request->{$param}])) { ?>
          <span><?php echo $options[$sf_request->{$param}]; ?></span>
          <?php unset($options[$sf_request->{$param}]); ?>
        <?php } else { ?>
          <span><?php echo array_shift($options); ?></span>
        <?php } ?>

      </div>

      <ul class="dropdown-options">

        <span class="pointer"></span>

        <?php foreach ($options as $key => $value) { ?>
          <li>
            <?php $urlParams = [
                'module' => $sf_request->module,
                'action' => $sf_request->action,
                $param => $key, ] + $sf_data->getRaw('sf_request')->getParameterHolder()->getAll(); ?>
            <a href="<?php echo url_for($urlParams); ?>" data-order="<?php echo $key; ?>">
              <span><?php echo $value; ?></span>
            </a>
          </li>
        <?php } ?>
      </ul>
    </div>
  </div>
</div>