# E-commerce API's

E-commerce api's to support e-commerce operations, such as product and category listing, product details, cart management, and order processing.

## Features

- JWT Authentication
- Role based authorization
- See all Categories and Products
- Create Categories and Products(for admin)
- Add product to cart
- Update and Delete functionality for cart products.
- Confirm Order
- See Order details.

## Tech Stack

**For Server-side:** Node.js, Express.js,Mongoose,bcrypt,jsonwebtoken,express-rate-limit,swagger-jsdoc,swagger-ui-express.

**Database:** MongoDB.

## Run Locally

Clone the project

```bash
  git clone https://github.com/raj8888/Ecommerce_API
```

Go to the project directory

```bash
  cd Ecommerce_API
```

Install dependencies

```bash
  npm install
```

Start the server (Download nodemon npm library globally)

```bash
  npm install -g nodemon
```

```bash
  nodemon index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`PORT`

`SECRET_KEY`

## API Reference

#### For Swagger Documentation

```http
  GET /api/api-docs
```

## For Login And Registration

#### User Register

```http
  POST /api/user/register
```

- sample body data
```
{
  "name":"check-1",
  "email":"check@gmail.com",
  "mobile":"6546545646",
  "password":"check"
}
```

#### User Login

```http
  POST /api/user/login
```

- sample body data
```
{
  "email":"check@gmail.com",
  "password":"check"
}
```

## For Categories

#### For Crete Categories

- only admin have access of this route
- authentication required

```http
  POST /api/category/create
```

- sample req.body data

```
{
  "name":"Sports Products",
  "description":"Lately, the online sports market has been in great profit as people search for sets used by popular players."
}
```

#### For All Categories(with description)

```http
  GET /api/category/all/description
```

#### For All Categories(without description)

```http
  GET /api/category/all/names
```

#### For Get Single Category

```http
  GET /api/category/:id
```

## For Products

#### For Crete Products

- only admin have access of this route
- authentication required

```http
  POST /api/product/create
```

- sample req.body data

```
{
  "title":"Gnc Micronized Monohydrate Creatine",
  "price":1799,
  "description":"Product Details Creatine supplementation may help to promote cellular hydration.Creatine has also been shown in numerous studies to help improve athletic performance.",
  "availability":true,
  "category":"64bfcae4fc94c391b2ff8893"
}
```

#### For All Produsts

```http
  GET /api/product/all
```

#### For All Product(Category wise)

```http
  GET /api/product/category/:categoryId
```

#### For Get Single Product

```http
  GET /api/product/:id
```

## For Cart

- Authentication required for routes in cart

#### For Add Product to Cart

```http
  POST /api/cart/add
```

- Sampe req.body

```
{
  "productId":"64bfd6e78984774617ff8b9f",
  "quantity":2
}
```

#### For View All Products in Cart

```http
  GET /api/cart/view
```

#### For Update Information in Cart

```http
  PUT /api/cart/update
```

#### Remove Product From Cart

```http
  DELETE /api/cart/:productID
```

## For Orders

- Authentication required for all routes in orders.

#### For Creat Order

```http
  POST /api/order/create
```

- sampel req.body data

```
{
  "products": [
    {
      "productId": "64bfd6e78984774617ff8b9f",
      "quantity": 5
    }
  ]
}
```

#### For Get History Of Orders

```http
  GET /api/order/history
```

#### For Get Details Of Particular Orders

```http
  GET /api/order/details/:id
```

## Important Design Decisions

- JWT Authentication: The API is protected using JSON Web Tokens (JWT) for authentication.Users need to include a valid JWT token in the 'beare token' header for accessing protected routes.
- Role-Based Authorization: To control access based on user roles, an authorization middleware is implemented. Certain routes, like creating a new category or product, are restricted to users with the 'admin' role, ensuring proper authorization checks.
- Error Handling: The API includes robust error handling for various scenarios. Different status codes and error messages are provided to assist developers and users in understanding issues during API usage.
- Rate Limiting: The implementation includes rate limiting middleware to prevent abuse and protect against DDoS attacks. It restricts the number of requests per hour to protect the API from excessive traffic.
- Public and Protected Routes: Both public and protected routes are implemented to allow unauthenticated users to access certain endpoints while ensuring that sensitive operations are protected behind authentication.

## Conclusion

- This project is an e-commerce API that provides essential features for managing users, categories, products, carts, and orders. It is designed with security, scalability, and ease of use in mind. The Swagger documentation ensures that API endpoints are well-documented and easy to explore.

## Backend Deployed Demo

[https://rose-real-piranha.cyclic.app](
https://rose-real-piranha.cyclic.app)

## Author

- [@raj8888](https://github.com/raj8888)

