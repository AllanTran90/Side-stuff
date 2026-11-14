<?php
require __DIR__ . '/../src/bootstrap.php';

$user = User::current();
$lines = Cart::lines();

if (!$lines) {
    redirect('/cart.php');
}

/* ---------- place the order ---------- */
if (is_post()) {
    verify_csrf();

    try {
        $orderId = Order::place($user['id'], $lines);
    } catch (RuntimeException $e) {
        flash($e->getMessage(), 'error');
        redirect('/checkout.php');
    }

    Cart::clear();
    redirect("/order.php?id=$orderId&new=1");
}

/* ---------- review ---------- */
$total = Cart::total($lines);
$balanceAfter = $user['credits'] - $total;
$canAfford = $balanceAfter >= 0;

partial('header', ['pageTitle' => 'Kassa']);
?>

<section class="container">
    <a class="back-link" href="/cart.php">← Varukorg</a>
    <h1 class="page-title">Kassa</h1>

    <div class="checkout-layout">
        <div class="panel">
            <h2 class="panel__title">Din beställning</h2>
            <ul class="mini-lines">
                <?php foreach ($lines as ['product' => $product, 'quantity' => $quantity, 'subtotal' => $subtotal]): ?>
                    <li>
                        <img src="<?= image_url($product['image']) ?>" alt="" width="48" height="60">
                        <span class="mini-lines__name"><?= e($product['name']) ?> <span class="muted">× <?= $quantity ?></span></span>
                        <span><?= kr($subtotal) ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>

            <h2 class="panel__title">Betalning</h2>
            <dl class="totals">
                <div><dt>Ditt saldo</dt><dd><?= kr($user['credits']) ?></dd></div>
                <div><dt>Att betala</dt><dd>−<?= kr($total) ?></dd></div>
                <div class="totals__grand <?= $canAfford ? '' : 'is-negative' ?>">
                    <dt>Saldo efter köp</dt><dd><?= kr($balanceAfter) ?></dd>
                </div>
            </dl>
        </div>

        <aside class="summary">
            <h2 class="summary__title">Sammanfattning</h2>
            <?php partial('totals', ['total' => $total]); ?>

            <?php if ($canAfford): ?>
                <form method="post">
                    <?= csrf_field() ?>
                    <button class="btn btn--primary btn--block">Betala <?= kr($total) ?></button>
                </form>
                <p class="muted small center">Beloppet dras från ditt saldo.</p>
            <?php else: ?>
                <button class="btn btn--primary btn--block" disabled>Betala <?= kr($total) ?></button>
                <p class="notice notice--error">Ditt saldo räcker inte. Ta bort något ur varukorgen för att fortsätta.</p>
            <?php endif; ?>
        </aside>
    </div>
</section>

<?php partial('footer'); ?>
