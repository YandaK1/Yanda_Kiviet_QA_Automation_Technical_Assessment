Feature: Add Products to Cart

  As a SauceDemo user
  I want to add products to my cart
  So that I can purchase the selected items

 # Positive Test Scenario
  Scenario: Add all products to the cart
    Given the user is logged in to SauceDemo
    When the user adds all available products to the cart
    Then the cart badge should display the correct product count
    And the cart should contain all added products