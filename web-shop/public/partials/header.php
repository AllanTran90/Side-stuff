<?php
/** @var string|null $pageTitle */
$user = User::current();
$cartCount = Cart::count();
$flash = take_flash();
$currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

$nav = [
    '/'            => 'Sortiment',
    '/about.php'   => 'Om oss',
    '/contact.php' => 'Kontakt',
    '/orders.php'  => 'Mina köp',
];
$isActive = fn(string $href) => $currentPath === $href || ($href === '/' && $currentPath === '/index.php');
?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e(isset($pageTitle) ? "$pageTitle · " . SITE_NAME : SITE_NAME . ' · Krispiga potatischips') ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="/assets/style.css">
    <script src="/assets/js/script.js" defer></script>
</head>
<body>
    <a class="skip-link" href="#main">Hoppa till innehåll</a>

    <header class="site-header">
        <div class="container site-header__inner">
            <a class="logo" href="/"><?= SITE_NAME ?><span class="logo__dot">.</span></a>

            <nav class="nav" aria-label="Huvudmeny">
                <?php foreach ($nav as $href => $label): ?>
                    <a href="<?= $href ?>" <?= $isActive($href) ? 'aria-current="page"' : '' ?>><?= $label ?></a>
                <?php endforeach; ?>
            </nav>

            <div class="site-header__actions">
                <span class="balance" title="Ditt saldo"><?= kr($user['credits']) ?></span>
                <a class="cart-button" href="/cart.php" aria-label="Varukorg, <?= $cartCount ?> varor">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" /><path d="M9 11V6.5a3 3 0 0 1 6 0V11" />
                    </svg>
                    <?php if ($cartCount > 0): ?>
                        <span class="cart-button__count"><?= $cartCount ?></span>
                    <?php endif; ?>
                </a>
            </div>
        </div>
    </header>

    <?php if ($flash): ?>
        <div class="toast toast--<?= e($flash['type']) ?>" role="status" data-toast>
            <?= e($flash['message']) ?>
        </div>
    <?php endif; ?>

    <main id="main" class="site-main">
