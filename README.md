***

## MeetApp

***

***Overview***
My Meet App is a serverless, progressive web application built with React and developed using Test-Driven Development. This app leverages the Google Calendar API to fetch and display upcoming events, providing users with a flexible and interactive way to browse events by city, filter details, and gain insights through data visualization. The app is optimized for both online and offline use, and can be installed directly onto a user’s device for quick access as a home screen shortcut.

***Features***

## Show/Hide Event Details 
As a user, I want the option to toggle visibility of event details, so I can focus on the overview or dive deeper when needed.

Given I am viewing the list of events,
When I choose to toggle the event details,
Then I should be able to show or hide additional details for each event.

## Specify Number of Events 
As a user, I want to specify how many events I see at once, so I can control my browsing experience and reduce information overload.

Given I am viewing the list of events,
When I select the number of events I want to see,
Then the app should display only the specified number of events.

## Use the App When Offline
As a user, I want to access event information offline, so I can stay informed even when I have no internet connection.

Given I have accessed the app and am currently offline,
When I try to view event information,
Then the app should display any available event data from the last time I was online.


## Add an App Shortcut to the Home Screen 
As a user, I want a quick shortcut to the app on my home screen, so I can access it easily and save time.

Given I am using the event app on a mobile device,
When I choose to add a shortcut to my home screen,
Then a shortcut icon should appear on my home screen, providing easy access to the app.


## Display Charts Visualizing Event Details
As a user, I want to view charts that summarize event details, so I can quickly understand patterns, trends, or statistics at a glance.

Given I am viewing event information,
When I want to see trends or statistics about events,
Then I should be able to view charts that visually summarize these details.