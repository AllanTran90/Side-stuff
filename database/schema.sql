CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    credits INTEGER
);

INSERT INTO users (name, credits)
VALUES
('Allan', 1000);

CREATE TABLE products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER
    description TEXT,
    image TEXT
);

INSERT INTO products(name, price, description)
VALUES(
    'Signatur-chips', 30, 'Chips with real umami-flavor',
    'Salted chips', 25, 'Really crunchy salted chips',
    'Dill', 25, 'Dill flavored chips'
);

CREATE TABLE orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    users_id INTEGER,
    total INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER
); 
