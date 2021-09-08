# Udacity_Storefront

## Requirements:

```sh
CREATE USER test_user WITH PASSWORD 'password123';
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
GRANT ALL PRIVILEGES ON DATABASE storefront TO test_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO test_user;
```

- fill out the sample env file (set the ENV variable to `test` when running tests)
- run the migrations via `db-migrate up -c 4`
- start the server via `yarn watch`
- the servers runs on port 3000, the host is 127.0.0.1
