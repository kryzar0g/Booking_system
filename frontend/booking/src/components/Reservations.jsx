import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reservations');
        setReservations(response.data);
      } catch (error) {
        alert('Error fetching reservations');
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h2>All Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            User {reservation.userName} booked Room {reservation.roomId} for Week {reservation.weekId}.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
