// Basic Reservation Web App Backend (Node.js + Express)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

// In-memory database (replace with real DB in production)
const users = [];
const reservations = [];
const rooms = [{ id: 1, name: 'Spravcovna' }, { id: 2, name: 'Dilna' }, { id: 3, name: 'Spodni mistnost' }, { id: 4, name: 'Naproti spravcovne' }, { id: 5, name: 'Zahrada' }];

// Register a user
app.post('/register', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send({ error: 'Name is required' });

  const user = { id: uuidv4(), name, bookings: 0 };
  users.push(user);
  res.status(201).send(user);
});

// Get available weeks
app.get('/weeks', (req, res) => {
  const currentDate = new Date();
  const weeks = [];

  for (let i = 0; i < 8; i++) {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() + i * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    weeks.push({
      weekId: i,
      start: startOfWeek.toISOString().split('T')[0],
      end: endOfWeek.toISOString().split('T')[0],
    });
  }

  res.send(weeks);
});

// Book a room
app.post('/book', (req, res) => {
  const { userId, weekId, roomId } = req.body;

  if (!userId || !weekId || !roomId) {
    return res.status(400).send({ error: 'userId, weekId, and roomId are required' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).send({ error: 'User not found' });

  const room = rooms.find(r => r.id === roomId);
  if (!room) return res.status(404).send({ error: 'Room not found' });

  const existingReservation = reservations.find(r => r.weekId === weekId && r.roomId === roomId);
  if (existingReservation) {
    return res.status(400).send({ error: 'Room is already booked for this week' });
  }

  const userBookingsThisWeek = reservations.filter(r => r.userId === userId && r.weekId === weekId);
  if (userBookingsThisWeek.length > 0) {
    return res.status(400).send({ error: 'User has already booked a room this week' });
  }

  const reservation = { id: uuidv4(), userId, weekId, roomId };
  reservations.push(reservation);
  user.bookings += 1;
  res.status(201).send(reservation);
});

// Get reservations
app.get('/reservations', (req, res) => {
  res.send(reservations);
});

// Delete a reservation
app.delete('/reservation/:id', (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).send({ error: 'Reservation not found' });
  }

  const [removedReservation] = reservations.splice(index, 1);
  const user = users.find(u => u.id === removedReservation.userId);
  if (user) user.bookings -= 1;

  res.send({ message: 'Reservation deleted successfully', reservation: removedReservation });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
