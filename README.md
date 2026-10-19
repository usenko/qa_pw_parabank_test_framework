# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md). 

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing. 

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Run the installation command in the project root:
```bash
npm ci
```
3. Run the browsers installation in the project root:
```bash
npx playwright install
```
4. Install Allure commandline tool (Allure requires Java 8 or higher):
```bash
npm install -g allure-commandline
```

## How to run the tests

1. To run all tests execute the following command in terminal for project folder (headless):
```bash
npm run test (runs npx playwright test)
```

2. Run a specific suite or file:
```bash
npx playwright test tests/auth
npx playwright test tests/loggedInUser/billPay/billPayPositive.spec.js
```

3. Run tests by title (example):
```bash
npx playwright test --grep "Sign in"
```

4. Run in headed mode or in Playwright UI mode:
```bash
npm run test:headed
npm run test:ui
```

## How to generate report

Allure commandline requires Java 8 or higher.

Test results are written to the `allure-results` folder automatically after
each test run (the `allure-playwright` reporter is configured in
`playwright.config.js`).

To generate the report and remove existing folder of created reports use next commands:

1. Remove old results and reports before a new run:
```bash
npm run allure:clean
```

2. Generate the report and open it in the browser:
```bash
npm run allure:serve
```

3. Generate a static report into `allure-report` and open it:
```bash
npm run allure:generate
npm run allure:open
```