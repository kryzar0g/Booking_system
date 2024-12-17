import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = () => {
  const [userName, setUserName] = useState('');
  const [weekId, setWeekId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [timeslotId, setTimeslotId] = useState('');
  const [response, setResponse] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weeksResponse = await axios.get('http://localhost:3000/weeks');
        const roomsResponse = await axios.get('http://localhost:3000/rooms');
        const timeslotsResponse = await axios.get('http://localhost:3000/timeslots');
        setWeeks(weeksResponse.data);
        setRooms(roomsResponse.data);
        setTimeslots(timeslotsResponse.data);
      } catch (error) {
        alert('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleBooking = async () => {
    const room = rooms.find(r => r.name === roomName);
    if (!room) {
      alert('Room not found');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/book', {
        userName,
        weekId: parseInt(weekId),
        roomId: room.id,
        timeslotId: parseInt(timeslotId),
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
        placeholder="Enter your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <select value={weekId} onChange={(e) => setWeekId(e.target.value)}>
        <option value="">Select Week</option>
        {weeks.map((week) => (
          <option key={week.weekId} value={week.weekId}>
            Week {week.weekId}: {week.start} - {week.end}
          </option>
        ))}
      </select>
      <select value={roomName} onChange={(e) => setRoomName(e.target.value)}>
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.name}>
            {room.name}
          </option>
        ))}
      </select>
      <select value={timeslotId} onChange={(e) => setTimeslotId(e.target.value)}>
        <option value="">Select Timeslot</option>
        {timeslots.map((timeslot) => (
          <option key={timeslot.id} value={timeslot.id}>
            {timeslot.start} - {timeslot.end}
          </option>
        ))}
      </select>
      <button onClick={handleBooking}>Book Room</button>
      {response && (
        <p>
          Booking Details: User {response.userName} booked {roomName} for Week {weekId}, Timeslot {timeslots.find(t => t.id === parseInt(timeslotId)).start} - {timeslots.find(t => t.id === parseInt(timeslotId)).end}
        </p>
      )}
    </div>
  );
};

export default Booking;
