<?php

const SITE_NAME = 'Crispz';
const PARTIALS = __DIR__ . '/../public/partials';

/** Escape for HTML output. */
function e(string|int|null $value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

/** 1234 → "1 234 kr" */
function kr(int|string $amount): string
{
    return number_format((int)$amount, 0, ',', "\u{202F}") . "\u{00A0}kr";
}

function image_url(string $file): string
{
    return '/assets/images/' . rawurlencode($file);
}

/** SQLite stores UTC; show it in local time. */
function format_date(string $utc): string
{
    $date = new DateTimeImmutable($utc, new DateTimeZone('UTC'));
    return $date->setTimezone(new DateTimeZone(date_default_timezone_get()))->format('j M Y, H:i');
}

function order_number(int|string $id): string
{
    return '#' . str_pad((string)$id, 5, '0', STR_PAD_LEFT);
}

/** Includes a partial with the given variables in scope. */
function partial(string $__partial, array $__vars = []): void
{
    // Odd names + EXTR_SKIP so a partial's variables can't overwrite these two.
    extract($__vars, EXTR_SKIP);
    require PARTIALS . "/$__partial.php";
}

/** Renders a whole page made of a single message block, then stops. */
function message_page(string $title, string $text, string $linkText = 'Till sortimentet', string $href = '/', int $status = 200): never
{
    http_response_code($status);
    partial('header', ['pageTitle' => $title]);
    partial('message', compact('title', 'text', 'linkText', 'href'));
    partial('footer');
    exit;
}

function redirect(string $path): never
{
    header("Location: $path");
    exit;
}

/** Only allow redirects back to our own site. */
function safe_path(?string $path, string $fallback = '/'): string
{
    return $path && str_starts_with($path, '/') && !str_starts_with($path, '//') ? $path : $fallback;
}

/* ---------- flash messages (shown once, on the next page) ---------- */

function flash(string $message, string $type = 'success'): void
{
    $_SESSION['flash'] = ['message' => $message, 'type' => $type];
}

function take_flash(): ?array
{
    $flash = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $flash;
}

/* ---------- forms ---------- */

function is_post(): bool
{
    return $_SERVER['REQUEST_METHOD'] === 'POST';
}

function csrf_token(): string
{
    return $_SESSION['csrf'] ??= bin2hex(random_bytes(16));
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

/** Call at the top of every POST handler. */
function verify_csrf(): void
{
    if (!hash_equals(csrf_token(), (string)($_POST['csrf'] ?? ''))) {
        message_page('Sessionen har gått ut', 'Ladda om sidan och försök igen.', status: 419);
    }
}

function post_int(string $key, int $default = 0): int
{
    $value = filter_var($_POST[$key] ?? null, FILTER_VALIDATE_INT);
    return $value === false ? $default : $value;
}
