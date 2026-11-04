Feature: User Login

  As a SauceDemo user
  I want to log in to the application
  So that I can access the products page

 # Positive Test Scenario
  Scenario: Login using valid credentials
    Given the user is on the SauceDemo login page
    When the user logs in using valid credentials
    Then the products page should be displayed

# Negative Test Scenarios
  Scenario Outline: Login using <testCase>
    Given the user is on the SauceDemo login page
    When the user logs in with "<username>" and "<password>"
    Then the login error message should be "<errorMessage>"

    Examples:
      | testCase          | username        | password       | errorMessage                                                          |
      | invalid username  | invalid_user123 | secret_sauce   | Epic sadface: Username and password do not match any user in this service |
      | invalid password  | standard_user   | wrong_password | Epic sadface: Username and password do not match any user in this service |
      | locked-out user   | locked_out_user | secret_sauce   | Epic sadface: Sorry, this user has been locked out.                    |
      | empty username    |                 | secret_sauce   | Epic sadface: Username is required                                     |
      | empty password    | standard_user   |                | Epic sadface: Password is required                                     |
      | empty credentials |                 |                | Epic sadface: Username is required                                     |
