# MongoDB, Mongoose, and ORM Documentation

## Table of Contents
1. [Introduction to MongoDB](#introduction-to-mongodb)
2. [Object-Relational Mapping (ORM)](#object-relational-mapping-orm)
3. [Mongoose](#mongoose)
   - [Installation](#installation)
   - [Connecting to MongoDB](#connecting-to-mongodb)
   - [Defining a Schema](#defining-a-schema)
   - [Creating a Model](#creating-a-model)
   - [CRUD Operations](#crud-operations)
   - [Middleware](#middleware)
   - [Validation](#validation)
4. [Distinctions Between RDBMS and NoSQL Databases](#distinctions-between-rdbms-and-nosql-databases)

---

## Introduction to MongoDB

### What is MongoDB?
MongoDB is a cross-platform document-oriented database program. It falls under the category of NoSQL databases, meaning it doesn't use the traditional relational database management system (RDBMS) structure. Instead, MongoDB stores data in flexible, JSON-like documents, making it easy to store and retrieve complex data structures.

### Key Features of MongoDB
- **Document-Oriented:** MongoDB stores data in flexible, JSON-like BSON documents.
- **Schema-less:** Unlike RDBMS, MongoDB doesn't require a predefined schema. Each document in a collection can have a different structure.
- **Scalability:** MongoDB can horizontally scale by adding more servers to the database.
- **High Performance:** It provides high-performance data persistence and retrieval.

---

## Object-Relational Mapping (ORM)

### ORM Overview
Object-Relational Mapping (ORM) is a programming technique used to interact with databases using an object-oriented paradigm. It allows developers to work with data in the form of objects, eliminating the need to use SQL queries directly.

### Advantages of ORM
- **Abstraction:** Developers can work with high-level programming languages without dealing directly with database-specific syntax.
- **Productivity:** ORM tools provide a set of APIs that simplify database operations, saving development time.
- **Portability:** Applications using ORM are often more portable across different database systems.

---

## Mongoose

### Installation
To use MongoDB with Node.js, Mongoose is a widely-used ORM. Install Mongoose using npm:

```bash
npm install mongoose
```
### Connecting to MongoDB
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', // console.error.bind(// console, 'Connection error:'));
db.once('open', () => {
  // console.log('Connected to MongoDB');
});
```
### Defining a Schema
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema);
```
### Creating a Model
```javascript
const newUser = new User({
  name: 'John Doe',
  age: 25,
  email: 'john.doe@example.com',
});

newUser.save((err, user) => {
  if (err) return // console.error(err);
  // console.log('User saved:', user);
});

```
### CRUD Operations
```javascript
// Find all users
User.find({}, (err, users) => {
  if (err) return // console.error(err);
  // console.log('All users:', users);
});

// Update a user
User.updateOne({ name: 'John Doe' }, { age: 26 }, (err, result) => {
  if (err) return // console.error(err);
  // console.log('User updated:', result);
});

// Delete a user
User.deleteOne({ name: 'John Doe' }, (err) => {
  if (err) return // console.error(err);
  // console.log('User deleted');
});

```
### Middleware
```javascript
userSchema.pre('save', function (next) {
  // Middleware logic before saving a user
  // console.log('About to save:', this.name);
  next();
});

```
### Validation
```javascript
const emailValidator = (email) => {
  // Custom validation logic for email
  return /\S+@\S+\.\S+/.test(email);
};

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: { type: String, required: true, validate: emailValidator },
});
```
## Distinctions Between RDBMS and NoSQL Databases

| Feature                   | RDBMS                                    | NoSQL                                  |
|---------------------------|------------------------------------------|----------------------------------------|
| **Schema**                | Requires a predefined schema with a fixed structure for all records. | Schema is dynamic; different records in the same collection can have different fields. |
| **Query Language**        | SQL (Structured Query Language) is used.   | Various query languages, often specific to the database type (e.g., MongoDB uses a JSON-like query language). |
| **Scalability**           | Typically scaled vertically by adding more power to existing servers. | Horizontally scalable, allowing distribution across multiple servers. |
| **Transaction Support**   | ACID properties (Atomicity, Consistency, Isolation, Durability) ensure transaction integrity. | May sacrifice some ACID properties for better performance and scalability. |
| **Use Cases**             | Well-suited for complex queries and transactions, where data integrity is critical (e.g., banking applications). | Ideal for handling large amounts of unstructured or semi-structured data, real-time applications, and scenarios requiring high scalability (e.g., social media platforms). |

This table provides a quick overview of the distinctions between RDBMS and NoSQL databases in terms of schema, query language, scalability, transaction support, and use cases.
