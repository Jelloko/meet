// src/__tests__/event.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let event;
  beforeEach(async () => {
    // Get mock data for a single event
    const allEvents = await getEvents();
    event = allEvents[0];
  });

  test('renders event title', () => {
    render(<Event event={event} />);
    const titleElement = screen.queryByText(event.summary);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders event start time', () => {
    render(<Event event={event} />);
    const startTimeElement = screen.queryByText(event.start?.dateTime);
    expect(startTimeElement).toBeInTheDocument();
  });

  test('renders event end time', () => {
    render(<Event event={event} />);
    const endTimeElement = screen.queryByText(event.end?.dateTime);
    expect(endTimeElement).toBeInTheDocument();
  });

  test('renders event location', () => {
    render(<Event event={event} />);
    const locationElement = screen.queryByText(event.location);
    expect(locationElement).toBeInTheDocument();
  });

  test('renders show details button', () => {
    render(<Event event={event} />);
    const buttonElement = screen.queryByText('Show Details');
    expect(buttonElement).toBeInTheDocument();
  });

  test('displays event details section when show details button is clicked', async () => {
    const user = userEvent.setup();
    render(<Event event={event} />);

    const showDetailsButton = screen.queryByText('Show Details');
    await user.click(showDetailsButton);

    // After clicking, expect details to be shown and button text to change
    const detailsSection = screen.queryByRole("description"); // Assuming `description` is part of event details
    expect(detailsSection).toBeInTheDocument();

    const hideDetailsButton = screen.queryByText('Hide Details');
    expect(hideDetailsButton).toBeInTheDocument();
  });

  test('hides event details section when hide details button is clicked', async () => {
    const user = userEvent.setup();
    render(<Event event={event} />);

    const showDetailsButton = screen.queryByText('Show Details');
    await user.click(showDetailsButton);

    const hideDetailsButton = screen.queryByText('Hide Details');
    await user.click(hideDetailsButton);

    const detailsSection = screen.queryByText(event.description);
    expect(detailsSection).not.toBeInTheDocument();

    // Ensure the "Show Details" button reappears
    expect(screen.queryByText('Show Details')).toBeInTheDocument();
  });
});