## Usage

In order to run this, you will need to install Docker on your machine to use the database

### Setting up the environment

Inside the repository's main directory, create a plain text file named '.env'
that will hold the configuration. The file should look like this:

```
POSTGRES_HOST= 127.0.0.1
POSTGRES_DB= storefront
POSTGRES_TEST_DB= storefront_test
POSTGRES_USER= storefront_user
POSTGRES_PASSWORD= password123
ENV= dev
BCRYPT_PASSWORD= storefront-password-salt
SALT_ROUNDS= 10
TOKEN_SECRET= storefront-token
```

### Setting up docker and postgresql

After the Docker installation completed you will want to run the following commands to setup databases for tests and production.
First thing first open a new terminal and get to the project root repository!

1. Run `sudo docker compose up` to set up the the used container to run the databases
2. While the container is running you need another terminal and run `sudo docker exec -ti container_name bash` to get into the container
3. Run `su postgres` to connect as postgres user
4. Run `psql --dbname=storefront --host=127.0.0.1 --username=storefront_user -W` and then when prompted type `password123` to connect to our main database
5. Now we need to create a new database to execute our tests; run `CREATE DATABASE storefront_test;`

### Install the modules

Run `npm run install` to install all required modules.

### Run the automated tests

Run `npm run test` to build the serer and run Jasmine tests as often as you
would like.

### Run the server

#### Building

1. Run `db-migrate up` to set up the regular database tables.
2. Run `npm run build` to build the server.
3. Run `npm run start` to run the server.

#### Using

The database will run on port 5432. You can access the server on localhost on
port 3000 (unless you change it in in `.env`), so http://localhost:3000.
From now you can navigate in the server!

##### Users routes

- Create: [post] http://localhost:3000/users to create a user.
  Parameters are: `first_name`, `last_name` and `password`.
  You will receive a JWT that is required for accessing most other routes.
- Index: [get] http://localhost:3000/users while providing authorization
  will list all users.
- Show: [get] http://localhost:3000/users/:id while providing authorization
  will list the information for the user with the `id`.
- Edit: [put] http://localhost:3000/users/:id while providing authorization
  With parameter: `new_lastname`
  will edit the user with the `id` and set `last_name` to the new last name
- Delete: [delete] http://localhost:3000/users/:id while providing
  authorization will delete the user with the `id`.
- Authenticate: [post] http://localhost:3000/user/:id to connect as the user
  with `id`.Parameters are: `firstname` & `password`

##### Products routes

- Index: [get] http://localhost:3000/products to get a list of all
  products.
- Show: [get] http://localhost:3000/products/:id to get the product with
  `id`.
- Show by category: [get] http://localhost:3000/products/categories/:category
  to get the products with`category`.
- Create: [post] http://localhost:3000/products while providing
  authorization to create a product.
  Parameters are: `name`, `price` and `category`.
- Edit: [put] http://localhost:3000/products/:id while providing
  authorization to edit a product with `id`. Parameters are: `name`.
- Delete: [delete] http://localhost:3000/products/:id while providing
  authorization to delete a product with `id`.

##### Order routes

- Index: [get] http://localhost:3000/orders while providing authorization
  to get a list of all orders.
- Show: [get] http://localhost:3000/orders/:user_id while providing
  authorization to get the order with the `id`.
- Create: [post] http://localhost:3000/orders while providing
  authorization to create an order. Parameters are: `user_id` and `status`.
- Edit: [put] http://localhost:3000/orders/:id while providing
  authorization to edit an order with `id`. Parameters are: `user_id` and
  `status`.
- Delete: [delete] http://localhost:3000/orders/:id while providing
  authorization to delete an order with `id`.
- Current orders: [get] http://localhost:3000/current_orders/:user_id while providing
  authorization to get the current order of the user with the id: `user_id`
- Complete orders: [get] http://localhost:3000/complete_orders/:user_id while providing
  authorization to get the complete orders of the user with the id: `user_id`

##### Order product routes

- Index: [get] http://localhost:3000/orderproducts while providing authorization
  to get a list of all order/product combinations.
- Show: [get] http://localhost:3000/orderproducts/:id while providing
  authorization to get order/product combination with `id`.
- Create: [post] http://localhost:3000/orderproducts while providing
  authorization to add a product with parameters: `product_id`,`order_id` & `quantity`.
- Edit: [put] http://localhost:3000/orderproducts/:id while providing
  authorization to edit a product/order combination with `id`. Parameters are
  `product_id`, `order_id` and `quantity`.
- Delete: [delete] http://localhost:3000/orderproducts/:id while providing
  authorization to delete an order/product combination with `id`.

##### Services routes

- Most popular products: [get] http://localhost:3000//most_popular_products
  to get list of the 5 most popular products

#### Deconstruction

1. Run `db-migrate reset` to drop the regular database tables.
2. Run `sudo docker compose down -v` to delete the databases(storefront & storefront_test) and the container
