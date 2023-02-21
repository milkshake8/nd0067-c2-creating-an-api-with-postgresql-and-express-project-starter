CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO order_products(order_id, product_id, quantity) VALUES
    (1, 2, 20),
    (2, 3, 10),
    (3, 2, 5),
    (2, 1, 13);