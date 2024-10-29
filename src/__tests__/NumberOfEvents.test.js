// src/__tests__/NumberOfEvents.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders input textbox', () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(32);
  });

  test('changes the value when a user types in it', async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('textbox');

    await user.clear(inputElement);  // Clear the default value
    await user.type(inputElement, '10');  // Type "10" into the input
    expect(inputElement).toHaveValue(10);
  });

  test('correctly handles user typing and erasing input', async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents />);
    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, '{backspace}{backspace}10');
    expect(inputElement).toHaveValue(10);
  });
});