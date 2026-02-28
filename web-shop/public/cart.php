<?php
session_start();
require_once '../src/Product.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$id = (int)$_POST['product_id'];
$quantity = (int)($_POST['quantity'] ?? 1);

if ($quantity < 1) {
    $quantity = 1;
}

if (!isset($_SESSION['cart'][$id])) {
    $_SESSION['cart'][$id] = $quantity;
} else {
    $_SESSION['cart'][$id] += $quantity;
}
    }

    header("Location: cart.php");
    exit;
}

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$total = 0;
?>

<link rel="stylesheet" href="style.css">

<h1>🛒 Your Cart</h1>

<?php if (empty($_SESSION['cart'])): ?>
    <p>Your cart is empty.</p>
<?php else: ?>

<?php foreach ($_SESSION['cart'] as $id => $quantity):
    $product = Product::find((int)$id);
    if (!$product) continue;

    $subtotal = $product['price'] * $quantity;
    $total += $subtotal;
?>
    <div class="card">
        <h2><?= htmlspecialchars($product['name']) ?></h2>
        <p><?= $quantity ?> × <?= $product['price'] ?> = <?= $subtotal ?></p>
    </div>
<?php endforeach; ?>

<h2>Total: <?= $total ?> credits</h2>

<a class="cart-link" href="checkout.php">Checkout</a>
<?php endif; ?>

<a class="cart-link" href="index.php">Back</a>
