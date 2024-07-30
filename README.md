# OWASP Juice Shop Test Suite (using Cypress)

## Overview

This project contains a Cypress test suite designed to validate key functionalities of the OWASP Juice Shop application. The test suite covers:

- Pagination functionality
- Changing the number of items per page
- Language change
- Invalid Login
- Successful login with correct credentials
- (Bonus) Security test for vulnerability

## Prerequisites

- [Node.js](https://nodejs.org/) 
- [Docker](https://www.docker.com/products/docker-desktop/)

## Setup

1. Clone the new repository:
    ```bash
    git clone https://github.com/Ankita1312/juice-shop.git
    cd juice-shop
    ```

2. Install Cypress:
    ```bash
    npm install cypress --save-dev
    ```
3. Build and run the Juice Shop using Docker:
    ```bash
    docker pull bkimminich/juice-shop
    docker run --rm -p 3000:3000 bkimminich/juice-shop
    ```


4. Run the tests:
   #### **_Note: Make sure that version 20.x of node.js in installed._**
   #### a. Run with Cypress Test runner:
    ```bash
    npx cypress open
    ```
   * Select e2e test then select browser and select <span style="background-color: green;">**_juiceShop.spec.ts_**</span> spec to run the test.

   ##### b. Headless (without opening Cypress test runner):
    ```bash
    npx cypress run --e2e --spec "test/cypress/e2e/juiceShop.spec.ts"
    ```

   

        
    