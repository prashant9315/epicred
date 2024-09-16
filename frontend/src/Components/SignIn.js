import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const googleauth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/aut/google/callback`,
      "_self"
    );
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        loginInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.data;
      console.log(result);
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <h2>Welcome Back!</h2>
        <p>Enter your details to access your account</p>

        <button className="google-button" onClick={googleauth}>
          <img src="/image 2.png" alt="Google" /> Continue with Google
        </button>

        <p className="or">or Log in with Email</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="mail@abc.com"
            value={loginInfo.email}
            onChange={handleChange}
            //onChange={(e) => setLoginInfo(e.target.value)}
            //required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={loginInfo.password}
            onChange={handleChange}
            //onChange={(e) => setLoginInfo(e.target.value)}
            //required
          />

          <button type="submit" className="signin-button">
            Sign In
          </button>
          <ToastContainer />
        </form>
      </div>

      <div className="signin-right">
        <div className="brand-logo">
          <img src="/Logo and tagline.png" alt="EpiCred" />
        </div>
        <div className="brand-description">
          <h2>Empowering Education, Financing Dreams</h2>
          <img src="/Girl img.png" alt="Graduation" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
