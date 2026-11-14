<?php
/**
 * Quantity input with − / + buttons. Works without JS (plain number input);
 * script.js wires up the buttons.
 *
 * @var string $name
 * @var int    $value
 * @var string $label
 */
?>
<div class="stepper" data-stepper>
    <button type="button" class="stepper__btn" data-step="-1" aria-label="Minska">−</button>
    <input class="stepper__input" type="number" name="<?= e($name) ?>" value="<?= (int)$value ?>"
        min="1" max="<?= Cart::MAX_QUANTITY ?>" inputmode="numeric" aria-label="<?= e($label) ?>">
    <button type="button" class="stepper__btn" data-step="1" aria-label="Öka">+</button>
</div>
