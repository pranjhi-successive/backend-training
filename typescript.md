# TypeScript

## Introduction

TypeScript is a statically typed superset of JavaScript designed for large-scale applications. It adds optional static typing to JavaScript, making code more robust and maintainable. TypeScript code is transpiled to JavaScript, ensuring compatibility with all JavaScript environments.

## Why TypeScript?

- **Static Typing:** Detect potential errors during development by specifying types for variables and functions.

- **Enhanced Tooling:** Improved code navigation, autocompletion, and refactoring support for better development experience.

- **ECMAScript Features:** Supports the latest ECMAScript features, compiling down to older versions for broader compatibility.

- **Readability:** Self-documenting code with type annotations for improved readability.

## Basic Types

### 1. Boolean

Represents a logical value, `true` or `false`.

```typescript
let isDone: boolean = false;
```
### 2. Number

Represents both integer and floating-point numbers.

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```
## 3.String

Represents a sequence of characters.

```typescript
let color: string = "blue";
let fullName: string = `John Doe`;
```
## 4.Array 

Arrays in TypeScript represent an ordered list of values, providing a structured way to work with multiple items of the same type.

## Examples:

### - Using `number[]` Syntax:

```typescript
let numbers: number[] = [1, 2, 3];
```
### -  Using `Array<string>` Syntax:

In TypeScript, you can declare an array of strings using the `Array<string>` syntax. This indicates that the array `fruits` will contain string values.

```typescript
let fruits: Array<string> = ["apple", "banana", "orange"];
```
## 5. Tuple

Represents an array with a fixed number of elements where each element can be of a different type.

```typescript
let person: [string, number] = ["John Doe", 30];
```
## 6.  Enum

An enum is a way to give more friendly names to sets of numeric values.

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
```
## 7. Void

Represents the absence of a type.

```typescript
function logMessage(): void {
  // console.log("This is a log message");
}
```
# TypeScript: Classes and Interfaces

TypeScript is a superset of JavaScript that adds static typing to the language. It introduces features from object-oriented programming, including classes and interfaces.

## Classes

In TypeScript, classes provide a blueprint for creating objects with shared properties and methods. They allow you to encapsulate and organize your code in a more structured manner.

### Declaring a Class

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    // console.log("Some generic sound");
  }
}
```
### Creating Instances
```typescript
const dog = new Animal("Dog");
dog.makeSound(); // Output: Some generic sound
```
### Inheritance
You can use inheritance to create a subclass that inherits properties and methods from a parent class.
```typescript
class Dog extends Animal {
  bark(): void {
    // console.log("Woof! Woof!");
  }
}

const myDog = new Dog("Buddy");
myDog.makeSound(); // Output: Some generic sound
myDog.bark(); // Output: Woof! Woof!

```
## Interfaces
Interfaces define the structure for objects in TypeScript. They allow you to enforce a certain shape for classes and objects.

### Declaring an Interface
```typescript
interface Shape {
  color: string;
  area(): number;
}
```
### Implementing an Interface
Classes can implement interfaces to ensure they have the required properties and methods.
```typescript
class Circle implements Shape {
  constructor(public radius: number, public color: string) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

const myCircle = new Circle(5, "red");
// console.log(myCircle.area()); // Output: 78.54
```
### Extending Interfaces
You can extend interfaces to create more specific interfaces.
```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}
```
These are just the basics of classes and interfaces in TypeScript. You can explore more advanced features and usage patterns based on your project requirements.

