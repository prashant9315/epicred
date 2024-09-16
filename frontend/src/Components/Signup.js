import React, { useState } from "react";
import "./Signup.css"; // Import a custom CSS file for styling if needed
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const googleauth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/aut/google/callback`,
      "_self"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile } = formData;
    if (!name || !email || !password || !mobile) {
      return handleError("name, email and password are required");
    }
    // Handle form submission logic, such as sending data to an API
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = response.data;
      console.log(result);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-section">
        <div className="brand-logo">
          <img src="/Logo and tagline.png" alt="Logo" />
        </div>
        <div className="education-image">
          <img src="/Girl img.png" alt="Graduate" />
        </div>
      </div>

      <div className="right-section">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign up to get started</h2>
          <p>Enter your details to start your dream journey</p>

          {/* <button
            className="google-btn"
            onClick={googleauth}
            onChange={handleChange}
          >
            Continue with Google
          </button> */}

          <div className="divider">
            <span>or Log in with Email</span>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            //required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            //required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            //required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile number"
            value={formData.mobile}
            onChange={handleChange}
            //required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Signup;
