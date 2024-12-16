import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weeks = () => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/weeks');
        setWeeks(response.data);
      } catch (error) {
        alert('Error fetching weeks');
      }
    };

    fetchWeeks();
  }, []);

  return (
    <div>
      <h2>Available Weeks</h2>
      <ul>
        {weeks.map((week) => (
          <li key={week.weekId}>
            Week {week.weekId}: {week.start} - {week.end}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weeks;
