# Crispz – webshop för chips

En liten webbutik byggd i vanlig PHP och SQLite. Man kan bläddra bland produkterna, lägga dem i en varukorg, betala med sitt saldo och få ett kvitto.

## Kom igång

```bash
php -S localhost:8000 -t public
```

Öppna sedan http://localhost:8000.

Databasen (`webshop.sqlite`) byggs automatiskt från `database/schema.sql` första gången en sida laddas. Vill du börja om från noll tar du bort filen.

## Struktur

```
src/
  bootstrap.php   session, autoload och hjälpfunktioner – laddas först av varje sida
  helpers.php     e(), kr(), partial(), flash(), csrf …
  Database.php    PDO-anslutning, bygger databasen om den saknas
  Product.php     läser produkter
  Cart.php        varukorgen (sparas i sessionen)
  Order.php       lägger order i en transaktion och hämtar kvitton
  User.php        aktuell användare (ingen inloggning än)

public/           webbroten
  index.php       startsida och sortiment
  product.php     produktsida
  cart.php        varukorg (GET visar den, POST lägger till/ändrar/tar bort)
  checkout.php    kassa (GET granskar, POST betalar)
  order.php       kvitto
  orders.php      Mina köp
  partials/       återanvändbara bitar: header, footer, product-card, add-to-cart, stepper, totals, message
  assets/         CSS, JS och bilder
```

## Köpflödet

1. **Lägg i varukorg.** Formuläret postar till `cart.php`, som kollar att produkten finns och begränsar antalet till max 10 per smak.
2. **Kassa.** `checkout.php` visar ordern och vad saldot blir efter köpet.
3. **Betala.** Ett POST-anrop kör `Order::place()` i en databastransaktion: saldot dras (bara om det räcker), sedan sparas ordern och dess rader. Går något fel rullas allt tillbaka.
4. **Kvitto.** Man skickas vidare till `order.php?id=…`. Priset sparas på varje orderrad, så kvittot stämmer även om priset ändras senare.

Alla formulär har CSRF-skydd, och allt som skrivs ut escapas med `e()`.
