import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', { name });
      setUserId(response.data.id);
      alert(`User registered! ID: ${response.data.id}`);
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {userId && <p>Your User ID: {userId}</p>}
    </div>
  );
};

export default Register;
