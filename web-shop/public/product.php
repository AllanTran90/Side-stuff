<?php
require_once '../src/Product.php';

$id = (int)($_GET['id'] ?? 0);
$product = Product::find($id);

if (!$product) {
    die("Product not found");
}
?>

<div class="product-container">

    <div class="product-image">
        <img src="assets/images/<?= htmlspecialchars($product['image']) ?>">
    </div>

    <div class="product-info">
        <h1><?= htmlspecialchars($product['name']) ?></h1>

        <p class="product-price">
            <?= $product['price'] ?> credits
        </p>

        <p class="product-description">
            <?= htmlspecialchars($product['description']) ?>
        </p>

        <div class="product-ingredients">
            <h3>Ingredients</h3>
            <p>Potatoes, sunflower oil, spices, soy, garlic, ginger, chili.</p>
        </div>

        <form method="post" action="cart.php">
            <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
            <button class="buy-button">Add to cart</button>
        </form>

        <a class="back-link" href="index.php">← Back to shop</a>
    </div>

</div>