<?php
session_start();

require_once '../src/Product.php';
require_once '../src/User.php';
require_once '../src/Order.php';

$user = User::current();
$total = 0;

foreach ($_SESSION['cart'] as $id => $quantity) {
    $product = Product::find($id);
    $total += $product['price'] * $quantity;
}

if ($total > $user['credits']) {
    die("❌ Not enough credits!");
}

$newCredits = $user['credits'] - $total;

User::updateCredits($user['id'], $newCredits);
Order::create($user['id'], $total, $_SESSION['cart']);

$_SESSION['cart'] = [];

header("Location: success.php");
exit;
