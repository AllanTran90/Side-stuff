<?php
/**
 * @var array $product
 * @var bool  $compact  true = small "+" button (cards), false = quantity picker (product page)
 */
$compact ??= false;
?>
<form method="post" action="/cart.php" class="add-to-cart <?= $compact ? 'add-to-cart--compact' : '' ?>">
    <?= csrf_field() ?>
    <input type="hidden" name="action" value="add">
    <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
    <input type="hidden" name="return" value="<?= e($_SERVER['REQUEST_URI'] ?? '/') ?>">

    <?php if ($compact): ?>
        <button class="icon-button" aria-label="Lägg <?= e($product['name']) ?> i varukorgen">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>
    <?php else: ?>
        <?php partial('stepper', ['name' => 'quantity', 'value' => 1, 'label' => 'Antal']); ?>
        <button class="btn btn--primary btn--grow">Lägg i varukorgen · <?= kr($product['price']) ?></button>
    <?php endif; ?>
</form>
