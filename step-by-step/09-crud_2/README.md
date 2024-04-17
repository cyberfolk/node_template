# Node.js CRUD Application with MongoDB

## Overview

This project is a Node.js application that uses Express and MongoDB to implement a RESTful API for managing a collection of "people". It supports CRUD operations: creating, reading, updating, and deleting entries in a MongoDB database.

## Features

-   **CRUD Operations**: Create, read, update, and delete people in the MongoDB database.
-   **Request Logging**: Uses middleware to log incoming requests to the console.
-   **Error Handling**: Custom error handling middleware to catch and respond to errors.
-   **MongoDB Connection**: A ready-to-use MongoDB client setup using the `mongodb` package, configurable via environment variables.
-   **Async handler**: Utility for wrapping asynchronous route handlers, simplifying error handling.
-   **Clean Shutdown**: Handles exit signals to close MongoDB connections cleanly before shutting down the application.

## Getting Started

### Prerequisites

-   Node.js
-   MongoDB Atlas account and a configured cluster

### Installation

**Clone the repo and install package:**

```bash
$ git clone https://github.com/cyberfolk/node_basics.git
$ cd node_basics
$ npm install
```

**Set up .env variables:**

-   Copy `.env` and create `.env.development`
-   Update the variables with your MongoDB credentials and other configurations.

### Running the Application

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

## License

This project is open-source software licensed under the ISC license.
