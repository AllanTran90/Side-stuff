PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    credits INTEGER DEFAULT 0
);

INSERT INTO users (name, credits)
VALUES ('Allan', 1000);

CREATE TABLE products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    description TEXT,
    image TEXT
);

INSERT INTO products(name, price, description, image)
VALUES
('Signature chips', 30, 'Chips with real umami flavor', 'soy_garlic_ginger_chili.png'),
('Salted chips', 25, 'Really crunchy salted chips', 'salted_chips.png'),
('Dill chips', 25, 'Dill flavored chips', 'dill_chips.png');

CREATE TABLE orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

