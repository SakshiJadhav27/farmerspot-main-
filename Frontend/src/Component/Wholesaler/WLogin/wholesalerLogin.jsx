import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./wholesalerLogin.css"
import { Link} from "react-router-dom";
import Farmer1 from "../../../images/bg_home1.jpg";
import { Navbar } from "../../Navbar/navbar"; // Adjust import path as needed

const WholesalerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform validation before submitting
      if (!validateForm()) {
        return;
      }
      const response = await axios.post('/wholeseller/login/', { email, password });
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: "Welcome to Farmer's Spot"
    });
      // Handle successful login, e.g., store token in local storage
      window.location.href = '/wholesalerHome';
    } catch (error) {
      console.error(error.response.data.error);
      // Handle login error, e.g., show error message
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Invalid email or password. Please try again.'
      });
    }
  };

  // Function to perform form validation
  const validateForm = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      isValid = false;
      showValidationError('Invalid email format.');
    }

    if (!validatePassword(password)) {
      isValid = false;
      showValidationError('Password is required.');
    }

    return isValid;
  };

  // Validation function for email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validation function for password
  const validatePassword = (password) => {
    return password.trim().length > 0;
  };

  // Function to display validation error message using Swal
  const showValidationError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: message
    });
  };

  return (
    <>
    <div className="position-fixed w-100" style={{zIndex:"100000"}}>
            <Navbar/>
    </div>
    <br/>
    <br/>
    <div>
    <div className="wlogin-container">
    <div className="wside-image">
        <img src={Farmer1} alt="Side Image" />
     </div>
     <div className="wlogin-form">
      <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:<span className="required">*</span></label>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label htmlFor="password">Password:<span className="required">*</span></label>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <Link to="/wholesalerRegister">Don't have an account? Register here</Link>
    </form>
    </div>
    </div>
    </div>
    </>
  );
};

export default WholesalerLogin;
