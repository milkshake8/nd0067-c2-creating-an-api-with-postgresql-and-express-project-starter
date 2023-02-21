CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER, 
    status VARCHAR(20), 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);

INSERT INTO orders(user_id, status) VALUES
    (1, 'active'),
    (1, 'complete'),
    (2, 'complete');