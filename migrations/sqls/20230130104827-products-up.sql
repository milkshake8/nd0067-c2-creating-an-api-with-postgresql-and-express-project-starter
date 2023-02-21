CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(50), price INTEGER, category VARCHAR (50));
INSERT INTO products (name, price, category)
    VALUES
        ('shirt', 2000, 'textiles'),
        ('ps4', 100000, 'electronics'),
        ('table', 20000, 'deco');