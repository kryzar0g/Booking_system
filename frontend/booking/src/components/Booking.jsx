import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [userId, setUserId] = useState('');
  const [weekId, setWeekId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [response, setResponse] = useState(null);

  const handleBooking = async () => {
    try {
      const res = await axios.post('http://localhost:3000/book', {
        userId,
        weekId: parseInt(weekId),
        roomId: parseInt(roomId),
      });
      setResponse(res.data);
      alert('Room booked successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Error booking room');
    }
  };

  return (
    <div>
      <h2>Book a Room</h2>
      <input
        type="text"
        placeholder="Enter your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Week ID"
        value={weekId}
        onChange={(e) => setWeekId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room ID (e.g., 1 or 2)"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleBooking}>Book Room</button>
      {response && <p>Booking ID: {response.id}</p>}
    </div>
  );
};

export default Booking;
