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
  console.log("This is a log message");
}
```

