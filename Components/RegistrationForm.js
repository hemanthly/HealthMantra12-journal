
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your registration logic here
    console.log('User:', user);

    // Assuming you have a function to make the registration API call
    // For example, using axios:
    // registerUser(user)
    //   .then(response => console.log('Registration successful', response))
    //   .catch(error => console.error('Registration failed', error));
  };

  return (
    <div className='register'>
      <h1>Registration Form</h1>
      
      <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default RegistrationForm;
