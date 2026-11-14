<?php
require __DIR__ . '/../src/bootstrap.php';

/* ---------- actions: add / update / remove ---------- */
if (is_post()) {
    verify_csrf();

    $productId = post_int('product_id');
    $product = Product::find($productId);

    if (!$product) {
        flash('Produkten finns inte längre.', 'error');
        redirect('/cart.php');
    }

    switch ($_POST['action'] ?? '') {
        case 'add':
            $before = Cart::quantityOf($productId);
            Cart::add($productId, max(1, post_int('quantity', 1)));
            $added = Cart::quantityOf($productId) - $before;

            flash($added > 0
                ? "{$product['name']} lades i varukorgen."
                : 'Max ' . Cart::MAX_QUANTITY . ' st per smak.', $added > 0 ? 'success' : 'error');
            redirect(safe_path($_POST['return'] ?? null));

        case 'update':
            Cart::set($productId, post_int('quantity'));
            break;

        case 'remove':
            Cart::remove($productId);
            flash("{$product['name']} togs bort.");
            break;
    }

    redirect('/cart.php');
}

/* ---------- view ---------- */
$lines = Cart::lines();
$total = Cart::total($lines);

if (!$lines) {
    message_page('Varukorgen är tom', 'Inget här än. Hitta en smak du gillar i sortimentet.');
}

partial('header', ['pageTitle' => 'Varukorg']);
?>

<section class="container">
    <h1 class="page-title">Varukorg</h1>

    <div class="checkout-layout">
        <ul class="line-items">
            <?php foreach ($lines as ['product' => $product, 'quantity' => $quantity, 'subtotal' => $subtotal]): ?>
                <li class="line-item">
                    <a href="/product.php?id=<?= $product['id'] ?>">
                        <img class="line-item__image" src="<?= image_url($product['image']) ?>" alt="" width="80" height="100">
                    </a>

                    <div class="line-item__info">
                        <a class="line-item__name" href="/product.php?id=<?= $product['id'] ?>"><?= e($product['name']) ?></a>
                        <span class="muted small"><?= kr($product['price']) ?> / st</span>

                        <div class="line-item__controls">
                            <form method="post" class="qty-control" aria-label="Antal <?= e($product['name']) ?>">
                                <?= csrf_field() ?>
                                <input type="hidden" name="action" value="update">
                                <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
                                <button class="qty-control__btn" name="quantity" value="<?= $quantity - 1 ?>" aria-label="Minska">−</button>
                                <span class="qty-control__value"><?= $quantity ?></span>
                                <button class="qty-control__btn" name="quantity" value="<?= $quantity + 1 ?>" aria-label="Öka"
                                    <?= $quantity >= Cart::MAX_QUANTITY ? 'disabled' : '' ?>>+</button>
                            </form>

                            <form method="post">
                                <?= csrf_field() ?>
                                <input type="hidden" name="action" value="remove">
                                <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
                                <button class="link-button">Ta bort</button>
                            </form>
                        </div>
                    </div>

                    <span class="line-item__total"><?= kr($subtotal) ?></span>
                </li>
            <?php endforeach; ?>
        </ul>

        <aside class="summary">
            <h2 class="summary__title">Sammanfattning</h2>
            <?php partial('totals', ['total' => $total]); ?>
            <a class="btn btn--primary btn--block" href="/checkout.php">Till kassan</a>
            <a class="btn btn--ghost btn--block" href="/">Fortsätt handla</a>
        </aside>
    </div>
</section>

<?php partial('footer'); ?>
