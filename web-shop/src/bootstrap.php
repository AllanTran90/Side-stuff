<?php

/**
 * Loaded first by every page: session, classes and helpers.
 */

declare(strict_types=1);

date_default_timezone_set('Europe/Stockholm');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$_SESSION['cart'] ??= [];

spl_autoload_register(function (string $class): void {
    $file = __DIR__ . "/$class.php";
    if (is_file($file)) {
        require $file;
    }
});

require __DIR__ . '/helpers.php';
