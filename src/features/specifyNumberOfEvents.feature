Feature: Specify Number of Events

  Scenario: User has not specified a number of events, show default number of events
    Given the user hasn’t specified the number of events
    When the user opens the app
    Then the user should see the default number of events (32)

  Scenario: User can change the number of events displayed
    Given the main page is open
    When the user specifies the number of events as 10
    Then the user should see 10 events displayed