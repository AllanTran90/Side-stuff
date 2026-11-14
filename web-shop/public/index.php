<?php
require __DIR__ . '/../src/bootstrap.php';

$products = Product::all();

partial('header');
?>

<section class="container hero">
    <p class="eyebrow">Potatischips · kryddade för hand</p>
    <h1 class="hero__title">Krispigt.<br>Enkelt. Gott.</h1>
    <p class="hero__lead">Tre smaker, gjorda i små satser av riktig potatis. Välj din favorit, eller ta alla tre.</p>
    <a class="btn btn--primary" href="#sortiment">Se sortimentet</a>
</section>

<section id="sortiment" class="container section">
    <div class="section__head">
        <h2 class="section__title">Sortiment</h2>
        <span class="muted"><?= count($products) ?> smaker</span>
    </div>

    <div class="product-grid">
        <?php foreach ($products as $product): ?>
            <?php partial('product-card', ['product' => $product]); ?>
        <?php endforeach; ?>
    </div>
</section>

<section class="container section">
    <ul class="features">
        <li>
            <strong>Små satser</strong>
            <span class="muted">Friterade några kilo i taget för jämn krispighet.</span>
        </li>
        <li>
            <strong>Riktiga råvaror</strong>
            <span class="muted">Svensk potatis, solrosolja och äkta kryddor.</span>
        </li>
        <li>
            <strong>Betala med saldo</strong>
            <span class="muted">Handla direkt med ditt saldo och få ett kvitto på köpet.</span>
        </li>
    </ul>
</section>

<?php partial('footer'); ?>
