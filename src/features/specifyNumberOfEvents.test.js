import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User has not specified a number of events, show default number of events', ({ given, when, then }) => {
    let AppComponent;

    given('the user hasn’t specified the number of events', () => {
      // No actions needed here, just load the app
    });

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the default number of events (32)', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    let numberInput;

    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the user specifies the number of events as 10', async () => {
      const user = userEvent.setup();
      const NumberOfEventsDOM = AppComponent.container.querySelector('#number-of-events');
      numberInput = within(NumberOfEventsDOM).queryByRole('textbox');
      await user.clear(numberInput);
      await user.type(numberInput, '10');
    });

    then('the user should see 10 events displayed', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(10);
      });
    });
  });
});