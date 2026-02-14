<link rel="stylesheet" href="style.css">

<h1>🛒 Your Cart</h1>

<?php foreach ($_SESSION['cart'] as $id => $quantity): 
    $product = Product::find($id);
    $subtotal = $product['price'] * $quantity;
    $total += $subtotal;
?>
    <div class="card">
        <h2><?= $product['name'] ?></h2>
        <p><?= $quantity ?> × <?= $product['price'] ?> = <?= $subtotal ?></p>
    </div>
<?php endforeach; ?>

<h2>Total: <?= $total ?> credits</h2>

<br>
<a class="cart-link" href="checkout.php">Checkout</a>
<a class="cart-link" href="index.php">Back</a>
