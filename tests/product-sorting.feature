Feature: Product Sorting

  As a SauceDemo user
  I want to sort the available products
  So that I can view them in my preferred order

 # Positive Test Scenarios
  Scenario Outline: Sort products by <sortOption>
    Given the user is logged in to SauceDemo
    When the user sorts products by "<sortOption>"
    Then all products should be sorted correctly by "<sortOption>"

    Examples:
      | sortOption           |
      | Name (A to Z)        |
      | Name (Z to A)        |
      | Price (low to high)  |
      | Price (high to low)  |