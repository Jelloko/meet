// src/__tests__/NumberOfEvents.test.js

import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  test('renders input textbox', () => {
    render(<NumberOfEvents onNumberChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    render(<NumberOfEvents onNumberChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(32);
  });

  test('changes the value when a user types in it', async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents onNumberChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');

    await user.clear(inputElement);  // Clear the default value
    await user.type(inputElement, '10');  // Type "10" into the input
    expect(inputElement).toHaveValue(10);
  });

  test('correctly handles user typing and erasing input', async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents onNumberChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, '{backspace}{backspace}10');
    expect(inputElement).toHaveValue(10);
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('renders the number of events specified by user input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const numberOfEventsInput = screen.getByLabelText('Number of Events:'); // Target the NumberOfEvents input
    await user.clear(numberOfEventsInput);  // Clear the default value
    await user.type(numberOfEventsInput, '10');  // Change to 10 events

    // Check if 10 events are rendered in the EventList
    const eventList = screen.getByRole('list');
    await waitFor(() => {
      const events = within(eventList).getAllByRole('listitem');
      expect(events).toHaveLength(10);
    });
  });
});