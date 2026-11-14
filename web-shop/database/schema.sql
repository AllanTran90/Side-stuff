PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    NOT NULL,
    credits INTEGER NOT NULL DEFAULT 0 CHECK (credits >= 0)
);

INSERT INTO users (name, credits) VALUES ('Allan', 1000);

CREATE TABLE products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    tagline     TEXT    NOT NULL,
    description TEXT    NOT NULL,
    ingredients TEXT    NOT NULL,
    weight      INTEGER NOT NULL,          -- grams
    price       INTEGER NOT NULL,          -- whole kronor
    image       TEXT    NOT NULL
);

INSERT INTO products (name, tagline, description, ingredients, weight, price, image) VALUES
(
    'Soja, vitlök, ingefära & chili',
    'Umami med en het eftersmak',
    'Vår signatur. Krispiga räfflade chips kryddade med rostad vitlök, färsk ingefära och en rejäl nypa chili, rundade av med japansk soja. Salt, sött och starkt i samma tugga.',
    'Potatis, solrosolja, sojasås (soja, vete, salt), vitlökspulver, ingefära, chiliflakes, socker, havssalt.',
    150, 35, 'soy_garlic_ginger_chili.jpg'
),
(
    'Salta chips',
    'Klassiskt, krispigt, havssalt',
    'Tjockskurna chips friterade i små satser och vända i flingsalt. Inget krångel – bara potatis när den är som bäst.',
    'Potatis, solrosolja, havssalt.',
    150, 29, 'salted_chips.jpg'
),
(
    'Dill',
    'Smak av svensk sommar',
    'Friska dillchips med en len gräddfilston. Perfekta till kräftskivan – eller en vanlig tisdag.',
    'Potatis, solrosolja, dill, gräddfilspulver (mjölk), lökpulver, havssalt, citronsyra.',
    150, 29, 'dill_chips.jpg'
);

CREATE TABLE orders (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER  NOT NULL,
    total      INTEGER  NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- price is copied at purchase time so old receipts stay correct
-- even if a product's price changes later.
CREATE TABLE order_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL CHECK (quantity > 0),
    price      INTEGER NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
