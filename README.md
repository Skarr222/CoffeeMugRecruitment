# Simple Inventory Management System

This is a RESTful API built with Node.js and Express.js for managing an inventory of products. The API supports basic CRUD operations and includes business logic for managing stock levels and creating orders.

## Features

- **Product Management**:

  - Add, retrieve, and manage products.
  - Validate product details such as name, description, price, and stock.

- **Stock Management**:

  - Restock products to increase stock levels.
  - Sell products to decrease stock levels, ensuring stock does not go below zero.

- **Order Management**:

  - Create new orders with customer and product details.
  - Automatically update stock levels when an order is placed.
  - Prevent orders from being placed if stock is insufficient.

- **Error Handling**:
  - Custom error handling for invalid input, resource not found, and server errors.
  - Appropriate HTTP status codes and error messages.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Joi**: Schema description language and data validator for JavaScript.
- **Winston**: Logging library for Node.js.

## Project Structure

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running locally or remotely.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/inventory-management-system.git
   cd inventory-management-system
   Ensure to use correct node version:
        nvm install 23.6.1
        nvm use 23.6.1
   Install dependencies:
        npm install
   ```

2. Set up environment variables: Create a .env file in the root directory.

Add the following variables:
MONGO_URI=mongodb://localhost:27017/inventory
PORT=3000

3. Start server.
   ```bash
   npm run api
   ```

## API Endpoints

### Products:

GET /products: Retrieve a list of all products.

POST /products: Create a new product.

POST /products/:id/restock: Restock a product.

POST /products/:id/sell: Sell a product.

### Orders:

GET /orders: Retrieve a list of all orders.

GET /orders/:id: Retrieve a specific order by ID.

POST /orders: Create a new order.

## Example Requests

### Create a Product:

```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 1500,
  "stock": 10
}'
```

## Create an Order:

```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
  "customerId": "12345",
  "products": [
    { "id": "productId1", "qty": 2 },
    { "id": "productId2", "qty": 1 }
  ]
}'
```

## Error Handling

#### The API returns appropriate HTTP status codes and error messages for various scenarios:

#### - 400 Bad Request: Invalid input data.

#### - 404 Not Found: Resource not found.

#### - 500 Internal Server Error: Server-side error.

## Logging

#### Logs are stored in combined.log and error.log files using Winston.
