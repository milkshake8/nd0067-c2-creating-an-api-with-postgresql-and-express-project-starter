CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    firstName VARCHAR(50) NOT NULL,
                    lastName VARCHAR (50),
                    password VARCHAR(100) NOT NULL,
                    UNIQUE(firstName)
                    );
INSERT INTO users(firstname, lastName, password) VALUES
    ('Milk', 'Job', 'passer1234'),
    ('Georges', 'Scott', 'bouger1234');