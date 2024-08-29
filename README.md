Here's a README for your project based on the `package.json` file:

---

# Monthly Control API

## Overview

**Monthly Control API** is a Node.js project designed to manage and control monthly activities using AWS DynamoDB. The project leverages the AWS SDK to interact with DynamoDB, and Jest for testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/monthly-control-api.git
cd monthly-control-api
pnpm install
```

## Usage

After installing the dependencies, you can start developing by running the test suite or bundling the project for deployment.

## Scripts

The following scripts are available:

- **Run Tests:**  
  Run the test suite with Jest.

  ```bash
  pnpm run test
  ```

- **Watch Tests:**  
  Run the test suite in watch mode.

  ```bash
  pnpm run test:watch
  ```

- **Bundle Project:**  
  Create a zip bundle of the project excluding test files for deployment.

  ```bash
  pnpm run bundle
  ```

## Dependencies

- **@aws-sdk/client-dynamodb**: AWS SDK for DynamoDB.
- **@aws-sdk/lib-dynamodb**: AWS SDK library for DynamoDB.

## Dev Dependencies

- **@babel/preset-env**: Babel preset for compiling ES2015+ syntax.
- **jest**: JavaScript testing framework.