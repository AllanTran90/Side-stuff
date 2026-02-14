<?php
session_start();

require_once '../src/Product.php';
require_once '../src/User.php';

$products = Product::all();
$user = User::current();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}
?>

<link rel="stylesheet" href="style.css">

<div class="topbar">
    <h1>🛍 Allan's Chip Shop</h1>
    <div>
        <span class="credits">
            💳 <?= $user['credits'] ?> credits
        </span>
        <a class="cart-link" href="cart.php">
            🛒 Cart (<?= array_sum($_SESSION['cart']) ?>)
        </a>
    </div>
</div>

<div class="grid">
    <?php foreach ($products as $product): ?>
        <div class="card">
            <img src="assets/images/<?= $product['image'] ?>">
            <h2><?= $product['name'] ?></h2>
            <p><?= $product['description'] ?></p>
            <p class="price"><?= $product['price'] ?> credits</p>

            <form method="post" action="cart.php">
                <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
                <button>Add to cart</button>
            </form>
        </div>
    <?php endforeach; ?>
</div>
