// src/App.js

import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [error, setError] = useState(null); 

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      if (Array.isArray(allEvents)) {
        const filteredEvents = currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } else {
        console.error("Expected an array but received:", allEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      {error && <p>Error: {error}</p>} {/* Display error message if any */}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <EventList events={events} />
      <NumberOfEvents onNumberChange={setCurrentNOE} />
    </div>
  );
};

export default App;