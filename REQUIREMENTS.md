# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index GET `http://localhost:3000/products`
- Show GET `http://localhost:3000/products/:id`
- Create [token required] POST `http://localhost:3000/products`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] GET `http://localhost:3000/users`
- Show [token required] GET `http://localhost:3000/users/:id`
- Create N[token required] POST `http://localhost:3000/users`

#### Orders

- Current Order by user (args: user id)[token required] GET `http://localhost:3000/ordersbyuser/:id`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

```
Table: Products (id:serial[primary key], name:varchar(150)[not null], price:numeric[not null], category:varchar(150))
```

#### User

- id
- username
- firstName
- lastName
- password

```
Table: Users (id:serial[primary key], username:varchar(150)[not null], firstname:varchar(150)[not null], lastname:varchar(150)[not null], password:varchar(255)[not null])
```

#### Orders

- id
- user_id
- status of order (active or complete)

```
Table: Orders (id:serial[primary key], user_id:integer(foreign key to users table), status:varchar(15))
```

#### Order-Products

- id
- quantity
- order_id
- product_id

```
Table: Order-Products (id:serial[primary key], quantity:numeric[not null], order_id:integer(foreign key to orders table), product_id:integer(foreign key to products table))
```
