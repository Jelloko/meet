// src/components/NumberOfEvents.js

import { useState } from 'react';

const NumberOfEvents = ({ onNumberChange }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setNumberOfEvents(value);
    if (onNumberChange) {
      onNumberChange(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
        type="number"
        role="textbox"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;