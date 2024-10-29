// src/components/Event.js

import { useState } from "react";

const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className="event">
            <p>{event.summary}</p>
           
            <p>{event.start?.dateTime}</p>
            <p>{event.end?.dateTime}</p>
            <p>{event.location}</p>
            <button className="detail-btn" onClick={()=>setShowDetails(!showDetails)}>
                { showDetails ? "Hide Details" : "Show Details"}
            </button>
            {
                showDetails ?  <p role="description" className="details">{event.description}</p> : <></>
            }
        </li>
    );
  }
  
  export default Event;