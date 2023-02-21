# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index ([get] /products)
- Show ([get] /products/:id)
- Create (args: product)[token required] ([post] /products)
- [OPTIONAL] Top 5 most popular products ([get] /most_popular_products)
- [OPTIONAL] Products by category (args: product category)([get] /products/categories/:category)
- Update (args: new_product_name, id)[token required]([put] /products/:id)
- Delete (args: product_id)[token required]([delete] /products/:id)

#### Users

- Index [token required]([get] /users)
- Show [token required]([get] /users/:id)
- Create N(args: user)[token required]([post] /users)
- Update (args: new_lastname, id)[token required]([put] /users/:id)
- Delete (args: id)[token required]([delete] /users/:id)
- Authenticate(args: firstname, password)([post] /users/:id)

#### Orders

- Current Order by user (args: user id)[token required]([get] /current_orders/:user_id)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]([get] /complete_orders/:user_id)
- Index [token required]([get] /orders)
- Show [token required]([get] /orders/id)
- Create (args: order)[token required]([post] /orders)
- Update (args: new_order)[token required]([put] /orders/:id)
- Delete [token required]([delete] /orders/:id)

#### Order_products

- Index [token required]([get] /order_products)
- Show [token required]([get] /order_products/:id)
- Create (args: order_products)[token required]([post] /order_products)
- Update (args: order_products)[token required]([put] /order_products/:id)
- Delete [token required]([delete] /order_products/:id)

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Database schema

- users (id SERIAL PRIMARY KEY, firstName VARCHAR(50) NOT NULL, lastName VARCHAR (50), password VARCHAR(100) NOT NULL, UNIQUE(firstName));
- products (id SERIAL PRIMARY KEY, name VARCHAR(50), price INTEGER, category VARCHAR (50));
- orders (id SERIAL PRIMARY KEY, user_id INTEGER, status VARCHAR(20), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);
- order_products (id SERIAL PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER, FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
