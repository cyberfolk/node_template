# Node.js CRUD Application with MongoDB

## Overview

This project is a Node.js application that uses Express and MongoDB to implement a RESTful API for managing a collection of "people". It supports CRUD operations: creating, reading, updating, and deleting entries in a MongoDB database.

## Features

-   **CRUD Operations**: Create, read, update, and delete people in the MongoDB database.
-   **Request Logging**: Uses middleware to log incoming requests to the console.
-   **Error Handling**: Custom error handling middleware to catch and respond to errors.
-   **Async Operations**: Utilizes async/await for asynchronous MongoDB operations.

## Getting Started

### Prerequisites

-   Node.js
-   MongoDB Atlas account and a configured cluster

### Installation

1. Clone the repository:

    ```bash
    $ git clone https://github.com/cyberfolk/node_basics.git
    ```

2. Install dependencies:
    ```bash
    $ cd node_basics
    $ npm install
    ```
3. Set up environment variables:

-   Rename `.env.example` to `.env`
-   Update the variables with your MongoDB credentials and other configurations.

### Running the Application

Start the application with:

```bash
$ npm start //or
$ NODE_ENV=development npm start
```

## API Endpoints

### People

-   **GET /api/people**: Fetch all people from the database.
-   **GET /api/people/search**: Search for people by query parameters.
-   **POST /api/people**: Add a new person or people to the database.
-   **PATCH /api/people/:id**: Partially update a person's information by their ID.
-   **PUT /api/people/:id**: Completely replace a person's information by their ID.
-   **DELETE /api/people/:id**: Delete a person by their ID.
-   **DELETE /api/people/delete**: Delete multiple people based on query parameters.

## Error Handling

Custom error responses are provided for various scenarios, including bad requests, unauthorized access, and server errors.

## Logging

Incoming requests are logged immediately, displaying the HTTP method, path, and timestamp.

## Utilities

Includes utilities for async error handling, creating search queries based on request parameters, and managing MongoDB connections.

## License

This project is open-source software licensed under the ISC license.
