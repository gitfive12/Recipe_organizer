
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  // Basic form validation
  if (!email.trim()) {
    setError('Email is required.');
    return;
  }

  if (!password.trim()) {
    setError('Password is required.');
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/api/signup', { email, password });
    const { userId } = response.data;
    localStorage.setItem('userId', userId);
    navigate('/login');
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Signup Error:', error.response.data);
      setError(error.response.data.error || 'Error signing up. Please try again.');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Signup Error:', error.request);
      setError('No response from server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Signup Error:', error.message);
      setError('Error signing up. Please try again.');
    }
  }
};

  return (
    <>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;


