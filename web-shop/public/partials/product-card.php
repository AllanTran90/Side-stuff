<?php /** @var array $product */ ?>
<article class="product-card">
    <a class="product-card__media" href="/product.php?id=<?= $product['id'] ?>">
        <img src="<?= image_url($product['image']) ?>" alt="<?= e($product['name']) ?>" loading="lazy" width="800" height="1200">
    </a>
    <div class="product-card__body">
        <div>
            <h3 class="product-card__title">
                <a href="/product.php?id=<?= $product['id'] ?>"><?= e($product['name']) ?></a>
            </h3>
            <p class="product-card__tagline"><?= e($product['tagline']) ?></p>
        </div>
        <div class="product-card__footer">
            <span class="price"><?= kr($product['price']) ?></span>
            <?php partial('add-to-cart', ['product' => $product, 'compact' => true]); ?>
        </div>
    </div>
</article>
