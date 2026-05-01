@bookStore
Feature: DemoQA Book Store Application

  @login @bookSearch @bookStore
  Scenario: Login, search for a book, validate result and logout
    Given I navigate to "https://demoqa.com/" home page
    When I click on Book Store Application
    And I click on Login
    And I login with valid credentials
    Then the username and logout button should be visible
    When I click on the BookStore menu item
    And I search for "Learning JavaScript Design Patterns"
    Then the search results should contain the book "Learning JavaScript Design Patterns"
    And I print the book title, author and publisher to a file
    When I click on Log Out
