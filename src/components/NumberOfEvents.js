// src/components/NumberOfEvents.js
import { useState } from 'react';

const NumberOfEvents = ({ onNumberChange, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value) || 0;
    setNumberOfEvents(value);
    if (onNumberChange) {
      onNumberChange(value);
    }
    let ErrorText;
    if (isNaN(value) || value <= 0) {
      ErrorText = "Please type a number greater then 0"
    } else {
      ErrorText = ""
    }
    setErrorAlert(ErrorText);
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
