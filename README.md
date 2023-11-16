# backend-training
# Node.js LTS Installation Guide

This guide provides step-by-step instructions to set up the stable LTS version of Node.js on a Debian-based system. Follow the instructions below to install Node.js and npm.

## Prerequisites

Make sure you have sudo privileges on your system.

1. Update Package list

```
sudo apt update
```

2. Install curl

```
sudo apt install curl
```

3. Setup LTS version of Node.js

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

4. Verify Installation

```
node -v
npm -v
```

# Project Setup

1. Cloned the repository with:

```
git clone https://github.com/pranjhi-successive/backend-training.git
```

2. Generated this README.md file in the repository explaining all steps.

3. Created file named 'different-architecture.md' to explain various architectural types.

4. Created a file named 'client-server.md' to explain the client-server architecture.

5. Install nodemon globally:

```
npm install -g nodemon
```

6. Created a folder named 'lib.'

7. Inside the 'lib' folder, created a file named 'math.js' and include operations such as add, sub, mult, div.

8. Exported all these operations.

9. In the project's root directory, created an 'index.js' file.

10. Run the application using nodemon;

```
nodemon index.js
```

11. Reviewed the generated 'Maths Operation Result.xlsx' file for the computed values.
