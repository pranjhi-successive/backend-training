# Middleware 

Middleware in web development refers to software components that lie between an operating system and the applications running on it. In the context of web frameworks, middleware is often used to perform various tasks such as request processing, authentication, logging, and more. It allows developers to extend and customize the behavior of an application by inserting code that runs before or after the main request-handling logic.

## Table of Contents

- [Express.js Middleware](#expressjs-middleware)
  - [Logger Middleware](#logger-middleware)
  - [Authentication Middleware](#authentication-middleware)
  - [Error Handling Middleware](#error-handling-middleware)
- [Custom Middleware](#custom-middleware)
- [Middleware in Other Frameworks](#middleware-in-other-frameworks)


## Express.js Middleware

[Express.js](https://expressjs.com/) is a popular web application framework for Node.js that makes extensive use of middleware. Here are some common middleware examples and their usage:

### Logger Middleware

```javascript
// loggerMiddleware.js
const loggerMiddleware = (req, res, next) => {
  // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// app.js
const express = require('express');
const app = express();

app.use(loggerMiddleware);
```
This middleware logs the timestamp, HTTP method, and URL of each incoming request.

### Authentication Middleware

```javascript
// authMiddleware.js
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === 'secretToken') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// app.js
const express = require('express');
const app = express();

app.use(authMiddleware);
```
This middleware checks for a valid authentication token in the request headers before allowing access to protected routes.

### Error Handling Middleware

```javascript
// errorHandlerMiddleware.js
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send('Internal Server Error');
};

// app.js
const express = require('express');
const app = express();

app.use(errorHandlerMiddleware);

```
This middleware catches errors that occur during request processing and sends a generic error response.

### Custom Middleware

Developers can also create custom middleware functions to handle specific tasks in their applications. These functions follow the same structure of taking req, res, and next as parameters.

``` javascript
// customMiddleware.js
const customMiddleware = (req, res, next) => {
  // Custom logic here
  next();
};

// app.js
const express = require('express');
const app = express();

app.use(customMiddleware);

```
In this example, customMiddleware can contain any custom logic that needs to be executed during the request-response cycle.

### Middleware in Other Frameworks
While Express.js is a popular choice, middleware concepts are not exclusive to it. Other web frameworks and platforms may have their own implementations and use cases for middleware. For example, Django Middleware in Django (Python web framework) allows developers to process requests and responses globally.

