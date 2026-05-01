@reqresApi @api
Feature: Reqres API Automation

  @createUser
  Scenario: Create user, validate, get user, and update name
    Given I send a POST request to create a new user
    Then the response status code should be 201
    And I store the created userId
    When I send a GET request for the created user
    Then the user details should match the created user
    When I send a PUT request to update the user's name
    Then the updated name should be reflected in the response
