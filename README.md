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



### Setting up Express

1. Install the latest stable version of Express using npm:

    ```bash
    npm install express
    ```

2. Set up and configure the `cookie-parser` dependency:

    ```bash
    npm install cookie-parser
    ```

### Setting up Postman

1. Open a terminal.

2. Add the Postman repository:

    ```bash
    sudo sh -c 'echo "deb https://dl.pstmn.io/download/latest/linux64" > /etc/apt/sources.list.d/postman.list'
    ```

3. Import the Postman GPG Key:

    ```bash
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61
    ```

4. Update the package list:

    ```bash
    sudo apt-get update
    ```

5. Install Postman:

    ```bash
    sudo apt-get install postman
    ```