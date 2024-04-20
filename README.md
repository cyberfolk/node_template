# Node Template

## Overview

This boilerplate is composed of independent modules, each dedicated to a different topic I have studied. It serves as a foundation for Node.js applications

## Custom Modules

-   **[Direct Logging](./src/middlewares/directLogger.js)** &rarr; Middleware to immediately log incoming request details.
-   **[Error Check](./src/middlewares/errorCheck.js)** &rarr; Middleware to intercept errors returning appropriate HTTP responses.
-   **[MongoDB Client](./src/connections/mongoClient.js)** &rarr; Factory that generates a MongoClient instance from configuration parameters.
-   **[Async Handler](./src/utils/asyncHandler.js)** &rarr; Utility to encapsulate asynchronous route handlers, simplifying error management in asynchronous operations.
-   **[Auth Session](./src/middlewares/authSession.js)** &rarr; Factory that returns middleware for managing sessions through cookies and storage in MongoDB.
-   **[Clean Shutdown](./src/utils/eventHandler.js)** &rarr; Sets event handlers for clean shutdown signals of the application
-   **[Demo Auth Session](./src/routes/demoAuthSession.js)** &rarr; Provides basic routes for session management and user authentication demonstrations.
-   **[Resource API](./src/routes/resource.js)** &rarr; Factory who provides modular RESTful API routes `/api/<resource>` for CRUD operations on MongoDB collections, supporting search, add, update, and delete functionalities. This structure allows easy adaptation for different resources, ensuring flexible and scalable management.

## Directory Structure

`node_template/`  
├─ `src/` _- Source code for the application._  
│ ├─ `config/` _- Configuration management and environment setup._  
│ ├─ `connections/` _- MongoDB client setup and database connection utility._  
│ ├─ `middlewares/` _- Middleware for error handling, request logging, and session management._  
│ ├─ `routes/` _- Express routes definitions for demo authentication and user management._  
│ └─ `utils/` _- Utilities like the async handler wrapper, query builders, and signal handling._  
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
$ git clone https://github.com/cyberfolk/node_template.git
$ cd node_template
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
