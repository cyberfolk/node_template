# Node.js Project Boilerplate

## Overview

This boilerplate provides a structured starting point for Node.js applications, incorporating best practices and common utilities for session management, error handling, MongoDB connections, configuration management, and logging middleware.

## Features

-   **Request Logging**: Immediate request logging middleware for tracing HTTP requests using `morgan` and a custom `directLogger`.
-   **Error Handling**: Custom error handling middleware to catch and respond to errors comprehensively.
-   **MongoDB Connection**: A robust MongoDB client setup using the `mongodb` package, configurable via environment variables and capable of handling connection interruptions.
-   **Async Handler**: Utility for wrapping asynchronous route handlers, simplifying error handling across asynchronous operations.
-   **Session Management**: Uses `express-session` and `connect-mongo` for handling user sessions with support for persistent sessions stored in MongoDB.
-   **Clean Shutdown**: Handles exit signals to close MongoDB connections cleanly before shutting down the application.
-   **Authentication and Session Routes**: Provides basic routes for session management and user authentication demonstrations.
-   **Resource API Routes**: Provides modular RESTful API routes `/api/<resource>` for CRUD operations on MongoDB collections, supporting search, add, update, and delete functionalities. This structure allows easy adaptation for different resources, ensuring flexible and scalable management.

## Directory Structure

`boilerplate/`  
│  
├─ `src/` _- Source code for the application._  
│ ├─ `config/` _- Configuration management and environment setup._  
│ ├─ `connections/` _- MongoDB client setup and database connection utility._  
│ ├─ `middlewares/` _- Middleware for error handling, request logging, and session management._  
│ ├─ `routes/` _- Express routes definitions for demo authentication and user management._  
│ └─ `utils/` _- Utilities like the async handler wrapper, query builders, and signal handling._  
│  
├─ `.env` _- Template for environment variables (copy to `.env.development` for development)._  
├─ `server.js` _- Entry point for the application._  
└─ `package.json` _- Project metadata and dependencies._

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

## License

This project is open-source software licensed under the ISC license.

<!-- ## Design Patterns

This project employs several architectural design patterns that enhance its scalability, maintainability, and modularity:

-   **Factory Pattern**: Used in creating instances of MongoDB clients and session handlers. This pattern allows for flexible and configurable instance creation that is decoupled from the system's business logic.
-   **Middleware Pattern**: Extensively used across the project for handling requests, errors, and logging. This pattern helps in separating concerns by isolating specific functions and behaviors in an application's request-response cycle, making the codebase easier to manage and extend.
-   **Module Pattern**: The use of modules to encapsulate configurations, database connections, and routes. Each module is responsible for a specific aspect of the application, enhancing code reusability and reducing dependencies.
-   **Singleton Pattern**: Implicitly used in managing the database connection. By ensuring that a single MongoDB client instance is created and reused throughout the application, this pattern helps in managing resources efficiently.
-   **Observer Pattern**: Used for handling exit signals to cleanly shut down the application. This pattern allows different parts of the application to respond to system-wide events without requiring tight coupling between the components. -->
