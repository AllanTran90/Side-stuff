<?php
require __DIR__ . '/../src/bootstrap.php';

partial('header', ['pageTitle' => 'Om oss']);
?>

<section class="container container--narrow prose">
    <p class="eyebrow">Om oss</p>
    <h1 class="page-title">Chips, gjorda med omsorg.</h1>
    <p>Crispz började med en enkel idé: chips ska smaka av det som står på påsen. Vi skär svensk potatis, friterar den i små satser och kryddar för hand, utan genvägar och utan fyllnadsmedel.</p>
    <p>Vår signatursmak tar inspiration från asiatisk gatumat med soja, vitlök, ingefära och chili. Bredvid den står två klassiker vi aldrig tröttnar på: rent havssalt och svensk dill.</p>
    <a class="btn btn--primary" href="/">Se sortimentet</a>
</section>

<?php partial('footer'); ?>
