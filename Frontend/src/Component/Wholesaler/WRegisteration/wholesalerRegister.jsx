import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './wholesalerRegister.css';
import Farmer1 from '../../../images/bg_home1.jpg';
import { Navbar } from '../../Navbar/navbar'; // Adjust import path as needed

const WholesalerRegistration = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        state: '',
        pincode: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform validation before submitting
            if (!validateForm()) {
                return;
            }

            const response = await axios.post('/wholeseller/register/', formData);
            console.log(response.data);
            // Handle successful registration, e.g., show success message
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'Your account has been created successfully.'
            });
            window.location.href = '/wholesalerLogin';
        } catch (error) {
            console.error(error.response.data.error);
            // Handle registration error, e.g., show error message
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: 'An error occurred while registering. Please try again later.'
            });
        }
    };

    // Function to perform form validation
    const validateForm = () => {
        const { fullName, phoneNumber, email, address, state, pincode, password } = formData;
        let isValid = true;

        // Check if any required field is empty
        for (const key in formData) {
            if (formData[key].trim() === '') {
                showValidationError(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
                isValid = false;
            }
        }

        if (!isValid) {
            return false;
        }

        // Additional validation for specific fields
        if (!validateFullName(fullName)) {
            isValid = false;
            showValidationError('Full Name should contain at least 2 characters.');
        }

        if (!validatePhoneNumber(phoneNumber)) {
            isValid = false;
            showValidationError('Phone Number should be a 10-digit number.');
        }

        if (!validateEmail(email)) {
            isValid = false;
            showValidationError('Email is invalid.');
        }

        if (!validateAddress(address)) {
            isValid = false;
            showValidationError('Address is invalid.');
        }

        if (!validateState(state)) {
            isValid = false;
            showValidationError('State is invalid.');
        }

        if (!validatePincode(pincode)) {
            isValid = false;
            showValidationError('Pincode is invalid.');
        }

        if (!validatePassword(password)) {
            isValid = false;
            showValidationError('Password should be at least 8 characters long.');
        }

        return isValid;
    };

    // Validation functions for each field
    const validateFullName = (fullName) => {
        return fullName.trim().length >= 2;
    };

    const validatePhoneNumber = (phoneNumber) => {
        return /^[0-9]{10}$/.test(phoneNumber);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateAddress = (address) => {
        return address.trim().length > 0;
    };

    const validateState = (state) => {
        return state.trim().length > 0;
    };

    const validatePincode = (pincode) => {
        return /^[0-9]{6}$/.test(pincode);
    };

    const validatePassword = (password) => {
        return password.trim().length >= 8;
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
            <div className="position-fixed w-100" style={{ zIndex: "100000" }}>
                <Navbar />
            </div>
            <br />
            <br />
            <br/>
            <div className='Wregistration-container'>
              <div className="wside-image">
                 <img src={Farmer1} alt="Side Image" />
                 <br/>
                 <br/>
                 <br/>
                 <br/>
              </div> 
            <div className='wfrom'>
            <form onSubmit={handleSubmit} >
              <br/>
                <div>
                  <h2>Registration</h2>
                  <br/>
                <label htmlFor="fullName">Full Name:<span className="required">*</span></label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />

                {/* Phone Number */}
                <label htmlFor="phoneNumber">Phone Number:<span className="required">*</span></label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

                {/* Email */}
                <label htmlFor="email">Email:<span className="required">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

                {/* Address */}
                <label htmlFor="address">Address:<span className="required">*</span></label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}/>

                {/* State */}
                <label htmlFor="state">State:<span className="required">*</span></label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange}/>

                {/* Pincode */}
                <label htmlFor="pincode">Pincode:<span className="required">*</span></label>
                <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />

                {/* Password */}
                <label htmlFor="password">Password:<span className="required">*</span></label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>

                {/* Submit button */}
                <center><button type="submit">Register</button></center>
                <Link to="/farmerLogin">Already have an account? Login here</Link>
              </div>
            </form>
            </div>
            </div>
        </>
    );
};

export default WholesalerRegistration;
