import React from 'react';
import Register from './components/Register';
import Weeks from './components/Weeks';
import Booking from './components/Booking';
import Reservations from './components/Reservations';


function App() {
  return (
    <div>
      <h1>Room Reservation System</h1>
      <Register />
      <Weeks />
      <Booking />
      <Reservations />
    </div>
  );
}

export default App;
