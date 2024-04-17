# Node.js Project Boilerplate

## Overview

This boilerplate provides a structured starting point for Node.js applications, incorporating best practices and common utilities for error handling, MongoDB connections, configuration management, and logging middleware.

## Features

-   **Request Logging**: Immediate request logging middleware for tracing HTTP requests.
-   **Error Handling**: Custom error handling middleware to catch and respond to errors.
-   **MongoDB Connection**: A ready-to-use MongoDB client setup using the `mongodb` package, configurable via environment variables.
-   **Async handler**: Utility for wrapping asynchronous route handlers, simplifying error handling.
-   **Clean Shutdown**: Handles exit signals to close MongoDB connections cleanly before shutting down the application.

## Directory Structure

`boilerplate/`  
│  
├─ `src/` _- Source code for the application._  
│ ├─ `connections/` _- MongoDB client setup and configuration._  
│ ├─ `middleware/` _- Middleware for error handling and request logging._  
│ ├─ `routes/` _- Express routes definitions (placeholders in this boilerplate)._  
│ └─ `utilities/` _- Utilities like the async handler wrapper and shutdown signal handler._  
│  
├─ `.env` _- Template for environment variables (copy to `.env.development` for development)._  
├─ `index.js` _- Entry point for the application._  
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
