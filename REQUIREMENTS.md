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

- id (SERIAL KEY)
- name VARCHAR(150)
- price integer
- [OPTIONAL] category

#### User

- id (SERIAL KEY)
- username VARCHAR(150)
- firstName VARCHAR(150)
- lastName VARCHAR(150)
- password VARCHAR(255)

#### Orders

- id (SERIAL KEY)
- id of each product in the order
- quantity of each product in the order
- user_id FOREIN KEY
- status of order (active or complete) VARCHAR(15)
