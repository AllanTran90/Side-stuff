<?php
/**
 * Centered message block for empty states, errors and confirmations.
 *
 * @var string $title
 * @var string $text
 * @var string $linkText
 * @var string $href
 */
?>
<section class="container container--narrow message">
    <h1 class="message__title"><?= e($title) ?></h1>
    <p class="muted"><?= e($text) ?></p>
    <a class="btn btn--primary" href="<?= e($href) ?>"><?= e($linkText) ?></a>
</section>
