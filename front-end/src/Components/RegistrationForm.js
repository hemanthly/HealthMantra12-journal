import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
require('dotenv').config(); // Load environment variables
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const FRONTEND_API_URL = process.env.REACT_APP_API_URL;

const RegistrationForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("User:", user);
    // Making the registration API call using axios
    axios.post("http://localhost:4006/register", user)
      .then((response) => {
        console.log("Registration successful", response.data);
        navigate("/journal");
        // You can add any further logic here after a successful registration
      })
      .catch((error) => {
        console.error("Registration failed", error);
        // You can handle errors or provide user feedback here
      });
  };

  const handleGoogleSignUp = async (e) => {
    try {
      console.log("inside handleGoogleSignUp");

      window.location.href = "http://localhost:4006/auth/google";

    } catch (error) {
      console.error("Error during Google authentication request", error);
    }
  };

  return (
<div className="container mt-5">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button variant="warning" type='submit'>
          Register
        </Button>
      </form>
      <Button variant="secondary" type='submit' onClick={handleGoogleSignUp}>
          Sign Up with Google
      </Button>
      <Button variant="info" type='submit' onClick={handleGoogleSignUp}>
          Login with Google
      </Button>
      {/* <a className='btn btn-block' href="/auth/google" onClick={handleGoogleSignUp} role='button'> */}
        {/* <i className='fab fa-google'></i> */}
        {/* Sign up with Google */}
      {/* </a> */}
    </div>

  );
};

export default RegistrationForm;