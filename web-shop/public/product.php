<?php
require __DIR__ . '/../src/bootstrap.php';

$product = Product::find((int)($_GET['id'] ?? 0));

if (!$product) {
    message_page('Produkten finns inte', 'Vi kunde inte hitta den produkten. Den kan ha tagits bort.', status: 404);
}

$inCart = Cart::quantityOf($product['id']);

partial('header', ['pageTitle' => $product['name']]);
?>

<div class="container">
    <a class="back-link" href="/">← Sortiment</a>
</div>

<section class="container product">
    <div class="product__media">
        <img src="<?= image_url($product['image']) ?>" alt="<?= e($product['name']) ?>" width="800" height="1200">
    </div>

    <div class="product__info">
        <p class="eyebrow">Potatischips · <?= (int)$product['weight'] ?> g</p>
        <h1 class="product__title"><?= e($product['name']) ?></h1>
        <p class="product__tagline"><?= e($product['tagline']) ?></p>
        <p class="product__price"><?= kr($product['price']) ?></p>

        <p class="product__description"><?= e($product['description']) ?></p>

        <?php partial('add-to-cart', ['product' => $product]); ?>

        <?php if ($inCart): ?>
            <p class="muted small">Du har <?= $inCart ?> st i <a href="/cart.php">varukorgen</a>.</p>
        <?php endif; ?>

        <dl class="details">
            <div>
                <dt>Ingredienser</dt>
                <dd><?= e($product['ingredients']) ?></dd>
            </div>
            <div>
                <dt>Vikt</dt>
                <dd><?= (int)$product['weight'] ?> g</dd>
            </div>
            <div>
                <dt>Jämförpris</dt>
                <dd><?= kr((int)round($product['price'] / $product['weight'] * 1000)) ?>/kg</dd>
            </div>
        </dl>
    </div>
</section>

<?php $others = Product::others($product['id']); ?>
<?php if ($others): ?>
    <section class="container section">
        <div class="section__head">
            <h2 class="section__title">Fler smaker</h2>
        </div>
        <div class="product-grid">
            <?php foreach ($others as $other): ?>
                <?php partial('product-card', ['product' => $other]); ?>
            <?php endforeach; ?>
        </div>
    </section>
<?php endif; ?>

<?php partial('footer'); ?>
