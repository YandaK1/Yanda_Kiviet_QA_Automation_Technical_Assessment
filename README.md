# SauceDemo | Playwright BDD Test Automation

**Author:** Yanda Kiviet  
**Role:** Quality Engineer | QA Automation  
**Application Under Test:** [SauceDemo (Swag Labs)](https://www.saucedemo.com/)  
**Project Type:** Automated Web UI Testing

## Overview

This repository contains an independent end-to-end test automation suite for **SauceDemo (Swag Labs)**, an existing demonstration e-commerce application provided by Sauce Labs.

The project uses **Playwright, TypeScript, Playwright BDD and the Page Object Model (POM)** to validate authentication, product sorting, shopping cart functionality and checkout.

It demonstrates practical Quality Engineering principles, including positive and negative testing, reusable components, meaningful assertions, scenario independence and cross-browser validation.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Technology Stack](#technology-stack)
3. [Test Coverage](#test-coverage)
4. [Project Structure](#project-structure)
5. [Installation and Setup](#installation-and-setup)
6. [Running the Tests](#running-the-tests)
7. [Test Reports and Results](#test-reports-and-results)
8. [Test Design and Maintainability](#test-design-and-maintainability)
9. [Troubleshooting](#troubleshooting)
10. [Author and Attribution](#author-and-attribution)

---

## Quick Start

For developers already familiar with Node.js and Playwright, the following commands are sufficient to set up and execute the project.

**Prerequisites:** Node.js, npm and an internet connection.

```powershell
# Install project dependencies
npm ci

# Install the required browser engines
npx playwright install

# Generate and run all automated tests
npm test

# Open the HTML test report
npm run report
```

Run these commands from the project root directory containing `package.json`.

For first-time setup, installation requirements and explanations, refer to [Installation and Setup](#installation-and-setup).

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | Browser automation and test execution |
| TypeScript | Test implementation language |
| Playwright BDD | Integrates Gherkin scenarios with Playwright |
| Gherkin | Defines readable Given/When/Then scenarios |
| Page Object Model (POM) | Encapsulates page locators and reusable interactions |
| Node.js and npm | Runtime and dependency management |

### Cross-Browser Testing

The suite executes across three browser engines:

- **Chromium** — Used by Chrome and other Chromium-based browsers.
- **Firefox** — Mozilla's browser engine.
- **WebKit** — The engine used by Safari.

Running the same scenarios across different browser engines helps identify potential compatibility issues.

## Test Coverage

The automation suite covers four functional areas:

### 1. Login

**Feature:** `tests/login.feature`

- Successful login using valid credentials.
- Invalid username and password.
- Locked-out user.
- Empty username, password and credentials.
- Validation of expected error messages.

### 2. Product Sorting

**Feature:** `tests/product-sorting.feature`

Validates all available sorting options:

- Name: A to Z
- Name: Z to A
- Price: Low to High
- Price: High to Low

The automation retrieves the displayed product names or prices, independently calculates the expected sorting order and compares it with the actual displayed order.

### 3. Shopping Cart

**Feature:** `tests/add-to-cart.feature`

- Add all available products to the shopping cart.
- Validate that the cart badge displays the expected product count.
- Verify that the cart contains all selected products.

### 4. Checkout

**Feature:** `tests/checkout.feature`

- Calculate the cart total from item quantities and prices.
- Enter valid checkout information.
- Validate mandatory fields using negative scenarios.
- Compare the calculated cart total with the displayed checkout item total.
- Verify that tax is displayed.
- Complete checkout and verify the success title and confirmation message.
- Verify that the cart badge no longer displays a count.
- Navigate to All Items through the application menu.
- Verify that the Products page is displayed and the cart is empty.
- Log out and confirm that the Login page is displayed.

**Cart Total Validation:** SauceDemo does not display a combined subtotal on its cart page. The automation calculates the expected total before checkout and compares it against the item total on the checkout overview page, excluding tax.

## Project Structure

```text
saucedemo-playwright-bdd/
├── src/
│   ├── fixtures/
│   │   └── pages-fixture.ts
│   └── pages/
│       ├── login-page.ts
│       ├── products-page.ts
│       ├── cart-page.ts
│       └── checkout-page.ts
├── tests/
│   ├── login.feature
│   ├── login.steps.ts
│   ├── product-sorting.feature
│   ├── product-sorting.steps.ts
│   ├── add-to-cart.feature
│   ├── add-to-cart.steps.ts
│   ├── checkout.feature
│   └── checkout.steps.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

### Directory Responsibilities

| Directory / File | Responsibility |
|---|---|
| `src/pages/` | Page objects containing locators and reusable actions |
| `src/fixtures/` | Shared fixtures that initialise page objects |
| `tests/*.feature` | Gherkin scenarios defining expected application behaviour |
| `tests/*.steps.ts` | Step definitions connecting scenarios to Playwright |
| `playwright.config.ts` | BDD integration, browser configuration and execution settings |
| `package.json` | Project dependencies and npm scripts |

Generated BDD files, browser reports, test results and installed dependencies are excluded from version control through `.gitignore`.

## Installation and Setup

### Prerequisites

Install the following software before setting up the project:

**Node.js and npm**

Download the recommended LTS version from [nodejs.org](https://nodejs.org/). npm is included with Node.js.

Verify the installation:

```powershell
node --version
npm --version
```

Both commands should return version numbers.

**Git (recommended)**

Download Git from [git-scm.com](https://git-scm.com/downloads).

Verify the installation:

```powershell
git --version
```

Git is needed to clone the repository but is optional if the project is downloaded as a ZIP file.

**Code Editor (optional)**

[Visual Studio Code](https://code.visualstudio.com/) is recommended for viewing, editing and debugging the tests.

### Step 1: Obtain the Project

**Option A — Clone from GitHub**

Copy the repository's HTTPS URL from GitHub and run:

```powershell
git clone REPOSITORY_URL
```


**Option B — Download the ZIP**

1. Open the GitHub repository.
2. Select **Code > Download ZIP**.
3. Extract the downloaded ZIP file to a local folder.

### Step 2: Open the Project

Open a terminal in the extracted or cloned project directory.

For a standard cloned repository, run:

```powershell
cd saucedemo-playwright-bdd
```

Alternatively, open the project in Visual Studio Code and select **Terminal > New Terminal**.

Confirm that `package.json` is present in the current directory.

### Step 3: Install Dependencies

```powershell
npm ci
```

This installs the exact dependency versions recorded in `package-lock.json`, ensuring a consistent environment.

The `node_modules` directory is generated automatically.

### Step 4: Install Playwright Browsers

```powershell
npx playwright install
```

This installs the browser binaries required to execute tests using Chromium, Firefox and WebKit.

Browser installation is normally only necessary during initial setup or after relevant Playwright updates.

### Step 5: Execute the Tests

```powershell
npm test
```

The project automatically generates the BDD tests and executes them across the configured browser engines.

**Note:** No local application server is required because the automation targets the publicly accessible SauceDemo website. An active internet connection is required.

## Running the Tests

All commands must be executed from the project root directory.

### Run the Full Test Suite

```powershell
npm test
```

This executes the configured npm script, which:

1. Runs `bddgen` to generate Playwright tests from the Gherkin feature files.
2. Executes the generated tests across all configured browser projects.

### Run Tests with Visible Browsers

To watch the tests execute:

```powershell
npx bddgen
npx playwright test --headed
```

### Run a Specific Feature

For example, to execute only the login feature across the configured browsers:

```powershell
npx bddgen
npx playwright test login.feature.spec.js
```

Running a single feature is useful for debugging.

### Open the Test Report

```powershell
npm run report
```

This opens the latest Playwright HTML report.

## Test Reports and Results

Playwright's HTML report provides execution results, test duration, error messages and stack traces. 

Additional debugging attachments, such as screenshots and traces, are available when configured and captured.

### Latest Local Execution

| Metric | Result |
|---|---|
| Unique scenarios | 17 |
| Browser engines | 3 |
| Total test executions | 51 |
| Passed | 51 |
| Failed | 0 |

All 51 test executions passed across Chromium, Firefox and WebKit in the latest reported local run.

Results may vary if the application, environment or test implementation changes.

## Test Design and Maintainability

The suite follows several core automation practices.

**Behaviour-Driven Development (BDD)**

Gherkin scenarios describe application behaviour using readable Given, When and Then statements.

**Page Object Model (POM)**

Page-specific interactions and locators are maintained in dedicated classes, reducing duplication and simplifying updates when the interface changes.

**Reusable Fixtures**

Playwright fixtures provide page object instances to step definitions without requiring repeated setup code.

**Scenario Independence**

Each scenario establishes its own required state rather than depending on the execution of another scenario.

**Meaningful Assertions**

Tests validate application behaviour, including sorting order, cart contents, totals, error messages and checkout confirmation, rather than only confirming that UI actions completed.

**Cross-Browser Validation**

The same scenarios run against Chromium, Firefox and WebKit to help detect browser-specific inconsistencies.

## Troubleshooting

### `npm` or `node` is not recognised

Confirm that Node.js is installed. Restart the terminal and verify:

```powershell
node --version
npm --version
```

### Browser executable is missing

Install the required browsers:

```powershell
npx playwright install
```

### No tests are found

Regenerate the BDD tests before execution:

```powershell
npx bddgen
npx playwright test
```

### Cucumber shows undefined steps in VS Code

Confirm that the Gherkin extension is configured to recognise the project's feature and step-definition files.

The expected locations are:

- Feature files: `tests/**/*.feature`
- Step definitions: `tests/**/*.steps.ts`

Restart the extension's language server or reload VS Code after modifying its configuration.

### Tests fail during execution

Review the terminal error output to identify the failed scenario and step.

Open the HTML report for additional details:

```powershell
npm run report
```

Where available, inspect screenshots, traces and error messages to investigate the failure.

### Application or network errors

Confirm that the internet connection is active and that [SauceDemo](https://www.saucedemo.com/) is accessible.

## Author and Attribution

**Yanda Kiviet**  
Quality Engineer | QA Automation

This independently developed test automation project demonstrates practical skills in end-to-end testing, BDD scenario design, reusable automation architecture, cross-browser validation and debugging.

**Application Under Test:** [SauceDemo — Swag Labs](https://www.saucedemo.com/)

SauceDemo is an existing demonstration application provided by Sauce Labs. This repository contains automated tests for that application and does not claim ownership of the application itself.