import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from "axios";
import { Button } from 'react-bootstrap';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleGoogleSignUp = async (e) => {
    try {
      console.log("inside handleGoogleSignUp");
      // const response = await axios.get("http://localhost:4006/auth/google", {
      //   withCredentials: true, // include cookies in the request if needed
      // });
      window.location.href = "http://localhost:4006/auth/google";
      // if (response.status === 200) {
      //   console.log("successful response");
      //   // Handle successful response, e.g., redirect to the Google authentication page
      //   window.location.href = "http://localhost:4006/auth/google";
      // } else {
      //   // Handle error response
      //   console.error("Google authentication request failed");
      // }
    } catch (error) {
      console.error("Error during Google authentication request", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here    
    console.log('Email:', email, 'Password:', password);

    const data = {
        email: email,
        password: password
    };
    
    console.log(data);
    await axios.post("http://localhost:4006/login", data)
        .then( (response)=>{
            console.log('login status', response);
            console.log("Login API call successful", response.data);
        })
        .catch( (error)=>{
            console.error("Login API call failed", error);
        });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <Button variant="info" type='submit' onClick={handleGoogleSignUp}>
          Login with Google
      </Button>
    </div>
  );

};

export default LoginForm;
