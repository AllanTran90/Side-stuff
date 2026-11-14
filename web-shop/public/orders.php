<?php
require __DIR__ . '/../src/bootstrap.php';

$orders = Order::allForUser(User::current()['id']);

if (!$orders) {
    message_page('Inga köp än', 'När du har handlat hamnar dina kvitton här.');
}

partial('header', ['pageTitle' => 'Mina köp']);
?>

<section class="container container--narrow">
    <h1 class="page-title">Mina köp</h1>

    <ul class="order-list">
        <?php foreach ($orders as $order): ?>
            <li>
                <a class="order-row" href="/order.php?id=<?= $order['id'] ?>">
                    <span class="order-row__id"><?= order_number($order['id']) ?></span>
                    <span class="muted"><?= format_date($order['created_at']) ?> · <?= (int)$order['item_count'] ?> st</span>
                    <span class="order-row__total"><?= kr($order['total']) ?></span>
                    <span class="order-row__arrow" aria-hidden="true">→</span>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</section>

<?php partial('footer'); ?>
