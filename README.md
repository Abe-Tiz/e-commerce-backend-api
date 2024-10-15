# E-commerce Backend API

This is a backend API for an e-commerce platform, built with Node.js, Express, Zod for validation, CASL for authorization, PostgreSQL for database management, and Redis for caching.

## Features

- **User Authentication**: Register and login users using JWT.
- **Product Management**: Perform CRUD operations on products.
- **Order Management**: Place orders and manage stock levels.
- **Caching**: Product list is cached in Redis for performance optimization.
- **Authorization**: Role-based access control using CASL.
- **File Upload**: The admin uploads an image of the product.
- **Filtering**: Filter the product using the product name, category, and price range in products endpoint `/product/views?name=test`, `/product/views?category="test category"`, `/product/views?minPrice=20&maxPrice=50`.
- **Rate Limit**: The user failed to login attempts and revoked the user from trying to log in again for 15 minutes after multiple failed attempts

## Technologies

- **Node.js**: Runtime environment for executing JavaScript on the server.
- **Express**: Web framework for Node.js.
- **Zod**: Validation library for request data.
- **CASL**: Access control for authorization.
- **PostgreSQL**: SQL database for storing e-commerce data.
- **Redis**: In-memory data store for caching.
- **JWT**: JSON Web Tokens for user authentication and authorization.

## Setup Instructions

### Database Setup
      
1. Make sure PostgreSQL is installed and running. 
2. Configure the `POSTGRES_URL` in your `.env` file with your own database URL or the one provided:
   
   ```bash
   POSTGRES_URL="postgres://default:FKnT70UsyDmi@ep-bold-tooth-a426dj03-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"


### Redis Setup

1. Make sure Redis is installed and running.
   
   - You can install Redis on the window Operating System by following the official installation instructions: [https://redis.io/download](https://github.com/microsoftarchive/redis/releases)

2. Configure the `REDIS_URL` in your `.env` file:
   
   ```bash
   REDIS_URL=redis://127.0.0.1:6379


### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [PostgreSQL](https://www.postgresql.org/) 
- [Redis](https://redis.io/)

### Environment Variables

Create a `.env` file in the root of the project and add the following:
  
    ```bash
    PORT=4000
    JWT_SECRET=eiuhkjfnwoirkgjnrveiulksgnsruikjgnkfrehielusjkg
    POSTGRES_URL="postgres://default:FKnT70UsyDmi@ep-bold-tooth-a426dj03-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
    REDIS_URL="your redis server route "

## Testing the API

You can use tools like Postman or `curl` to test the API endpoints. Below are some sample requests for common actions:

### Register User:

    ```bash
    POST /user/register
    {
      "username": "JohnDoe",
      "email": "john@example.com",
      "password": "password123"
    }
