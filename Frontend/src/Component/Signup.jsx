import { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate hook

import axios from 'axios';
import '../Style/Signup.css';
import locationData from './LocationData'; // Import location data

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locationId, setLocationId] = useState("");
  const [signupStatus, setSignupStatus] = useState('');
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !locationId) {
      setEmptyFieldsError(true);
      return;
    }

    try {
      console.log('Request Payload:', {
        username,
        email,
        password,
        locationId
      });

      const response = await axios.post('http://localhost:3001/farms', {
        username,
        email,
        password,
        locationId
      });

      console.log("respose:", response);

      if (response.status===201 && response.data.message==='Registration Successful!') {
        setSignupStatus(response.data.message);
        console.log("account crated Successfully.")
        alert("Registration Successful.")
        navigate('/');
      } 
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupStatus('An error occurred while signing up. Please try with another email.');
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    setLocationId(selectedLocationId);
    console.log('Selected location ID:', selectedLocationId);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form onSubmit={handleSignup} className="signup-form">
          <h2 className="signup-title">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <select
              value={locationId}
              onChange={handleLocationChange}
              className="form-input"
            >
              <option value="">Select Location</option>
              {locationData.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group footSignhome">
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>
          {emptyFieldsError && <p className="error-message">Please fill in all fields</p>}
          {signupStatus && (
            <p className={signupStatus.includes('error') ? 'error-message' : 'confirmation-message'}>
              {signupStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
