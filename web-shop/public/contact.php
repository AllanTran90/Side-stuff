<?php
require __DIR__ . '/../src/bootstrap.php';

partial('header', ['pageTitle' => 'Kontakt']);
?>

<section class="container container--narrow prose">
    <p class="eyebrow">Kontakt</p>
    <h1 class="page-title">Hör av dig.</h1>
    <p>Frågor om en beställning, eller vill du bara säga hej? Skriv till oss så svarar vi inom ett par dagar.</p>

    <dl class="details">
        <div>
            <dt>E-post</dt>
            <dd><a href="mailto:hej@crispz.example">hej@crispz.example</a></dd>
        </div>
        <div>
            <dt>Svarstid</dt>
            <dd>Vardagar, oftast inom 48 timmar</dd>
        </div>
    </dl>
</section>

<?php partial('footer'); ?>
