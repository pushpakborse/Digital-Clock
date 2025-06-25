import React, { useState, useEffect } from 'react';
import './DigitalClock.css';

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  //
  
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="clock-container">
      <div className="digital-clock">
        <div className="time-section">
          <span className="time-unit">{hours}</span>
          <span className="separator">:</span>
          <span className="time-unit">{minutes}</span>
          <span className="separator">:</span>
          <span className="time-unit">{seconds}</span>
        </div>
        <div className="date-section">
          {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
}

export default DigitalClock;