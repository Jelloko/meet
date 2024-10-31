import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  let AppComponent;
  let EventListItems;

  beforeEach(async () => {
    AppComponent = render(<App />);
    const eventList = await AppComponent.findByRole('list', { id: 'event-list' });
  
    // Wait until there are list items rendered in the event list
    await AppComponent.findAllByRole('listitem');
    EventListItems = within(eventList).getAllByRole('listitem');
  });

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user has not clicked the "Show Details" button', () => {
      // No action needed; this is the default state
    });

    when('the user views the event', () => {
      // No action needed; we just rendered the component
    });

    then('the event details should not be visible for any event', () => {
      EventListItems.forEach((eventItem) => {
        const eventDetails = within(eventItem).queryByRole('description');
        expect(eventDetails).not.toBeInTheDocument(); // Ensure details are not visible
      });
    });
  });

  test('Show event details when user clicks "Show Details" button', ({ given, when, then }) => {
    given('the list of events has been loaded', () => {
      expect(EventListItems.length).toBeGreaterThan(0);
    });

    when('the user clicks on the "Show Details" button of an event', async () => {
      const user = userEvent.setup();
      const showDetailsButton = within(EventListItems[0]).getByRole('button', { name: /show details/i });
      await user.click(showDetailsButton);
    });

    then('the event details should be shown', () => {
      const eventDescription = within(EventListItems[0]).getByRole('description');
      expect(eventDescription).toBeInTheDocument();
    });
  });

  test('Hide event details when user clicks "Hide Details" button', ({ given, when, then }) => {
    given('the event details are currently shown for an event', async () => {
      const user = userEvent.setup();
      const showDetailsButton = within(EventListItems[0]).getByRole('button', { name: /show details/i });
      await user.click(showDetailsButton);
      const eventDescription = within(EventListItems[0]).getByRole('description');
      expect(eventDescription).toBeInTheDocument();
    });

    when('the user clicks on the "Hide Details" button of the event', async () => {
      const user = userEvent.setup();
      const hideDetailsButton = within(EventListItems[0]).getByRole('button', { name: /hide details/i });
      await user.click(hideDetailsButton);
    });

    then('the event details should be hidden', () => {
      const eventDescription = within(EventListItems[0]).queryByRole('description');
      expect(eventDescription).not.toBeInTheDocument();
    });
  });
});
