import React from "react";
import "./Toggle.css"; // CSS for styling

const Toggle = ({ func }) => {
  const handleTabSwitch = (tab) => {
    func(tab);
  };

  return (
    <div className="container">
      <div className="toggle-container">
        <button
          className={`toggle-button `}
          onClick={() => handleTabSwitch("signin")}
        >
          Sign In
        </button>
        <button
          className={`toggle-button `}
          onClick={() => handleTabSwitch("signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Toggle;
