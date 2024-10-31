Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
  Given the user has not clicked the "Show Details" button
  When the user views the event
  Then the event details should not be visible for any event

Scenario: Show event details when user clicks "Show Details" button
  Given the list of events has been loaded
  When the user clicks on the "Show Details" button of an event
  Then the event details should be shown

Scenario: Hide event details when user clicks "Hide Details" button
  Given the event details are currently shown for an event
  When the user clicks on the "Hide Details" button of the event
  Then the event details should be hidden