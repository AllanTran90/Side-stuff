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

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Allan's Chip Shop</title>
    <link rel="stylesheet" href="assets/style.css">
</head>

<body>

    <div class="topbar">
        <div class="logo">
            <h1>🛍 Allan's Chip Shop</h1>
        </div>

        <nav class="nav">
            <a href="index.php">Shop</a>
            <a href="about.php">About</a>
            <a href="contact.php">Contact</a>
        </nav>

        <div class="topbar-right">
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
                <h2>
                    <a href="product.php?id=<?= $product['id'] ?>">
                        <?= $product['name'] ?>
                    </a>
                </h2>
                <p><?= $product['description'] ?></p>
                <p class="price"><?= $product['price'] ?> credits</p>

<form method="post" action="cart.php">
    <input type="hidden" name="product_id" value="<?= $product['id'] ?>">

    <input 
        type="number" 
        name="quantity" 
        value="1" 
        min="1" 
        max="10"
        class="quantity-input"
    >

    <button>Add to cart</button>
</form>
            </div>
        <?php endforeach; ?>
    </div>

</body>

</html>