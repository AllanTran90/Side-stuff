<?php
require __DIR__ . '/../src/bootstrap.php';

$user = User::current();
$order = Order::findForUser((int)($_GET['id'] ?? 0), $user['id']);

if (!$order) {
    message_page('Kvittot finns inte', 'Vi hittade ingen beställning med det numret.', 'Mina köp', '/orders.php', 404);
}

$isNew = isset($_GET['new']);

partial('header', ['pageTitle' => 'Kvitto ' . order_number($order['id'])]);
?>

<section class="container container--narrow">
    <?php if ($isNew): ?>
        <div class="confirmation">
            <span class="confirmation__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
            </span>
            <h1 class="page-title">Tack för din beställning!</h1>
            <p class="muted">Här är ditt kvitto. Du hittar det också under <a href="/orders.php">Mina köp</a>.</p>
        </div>
    <?php else: ?>
        <a class="back-link" href="/orders.php">← Mina köp</a>
    <?php endif; ?>

    <article class="receipt">
        <header class="receipt__head">
            <div>
                <span class="logo logo--small"><?= SITE_NAME ?><span class="logo__dot">.</span></span>
                <p class="muted small">Kvitto</p>
            </div>
            <dl class="receipt__meta">
                <div><dt>Order</dt><dd><?= order_number($order['id']) ?></dd></div>
                <div><dt>Datum</dt><dd><?= format_date($order['created_at']) ?></dd></div>
                <div><dt>Kund</dt><dd><?= e($user['name']) ?></dd></div>
            </dl>
        </header>

        <table class="receipt__table">
            <thead>
                <tr><th>Produkt</th><th class="num">Antal</th><th class="num">À-pris</th><th class="num">Summa</th></tr>
            </thead>
            <tbody>
                <?php foreach ($order['items'] as $item): ?>
                    <tr>
                        <td><?= e($item['name']) ?></td>
                        <td class="num"><?= (int)$item['quantity'] ?></td>
                        <td class="num"><?= kr($item['price']) ?></td>
                        <td class="num"><?= kr($item['subtotal']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <?php partial('totals', ['total' => (int)$order['total']]); ?>

        <p class="receipt__foot muted small">Betalt med saldo · Inkl. moms 12 % (<?= kr((int)round($order['total'] - $order['total'] / 1.12)) ?>)</p>
    </article>

    <div class="receipt__actions">
        <button class="btn btn--ghost" type="button" data-print>Skriv ut kvitto</button>
        <a class="btn btn--primary" href="/">Fortsätt handla</a>
    </div>
</section>

<?php partial('footer'); ?>
