Feature: Checkout

  As a SauceDemo user
  I want to complete the checkout process
  So that I can successfully purchase products

  Background:
    Given the user is logged in to SauceDemo

  # Positive Test Scenario
  Scenario: Validate checkout item total and tax
    When the user adds all available products to the cart
    And the user opens the cart
    And the user calculates the cart total
    And the user proceeds to checkout
    And the user enters valid checkout information
    Then the displayed item total should match the calculated cart total
    And the checkout tax should be displayed

  # Positive Test Scenario
  Scenario: Complete checkout and verify the post-purchase journey
    Given the user is on the checkout overview with all products
    When the user completes checkout
    Then the checkout success title should be displayed
    And the checkout success message should be displayed
    And the cart badge should not display a number

    When the user navigates to All Items using the menu
    Then the products page should be displayed

    When the user opens the cart
    Then the cart should be empty

    When the user logs out
    Then the login page should be displayed

  # Negative Test Scenarios
  Scenario Outline: Checkout with <testCase>
    Given the user is on the checkout information page with products in the cart
    When the user enters "<firstName>", "<lastName>" and "<postalCode>"
    Then the checkout error message should be "<errorMessage>"

    Examples:
      | testCase            | firstName | lastName | postalCode | errorMessage                   |
      | missing first name  |           | User     | 8001       | Error: First Name is required  |
      | missing last name   | Test      |          | 8001       | Error: Last Name is required   |
      | missing postal code | Test      | User     |            | Error: Postal Code is required |