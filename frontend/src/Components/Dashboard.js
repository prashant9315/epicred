import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [loggedInUser, SetloggedInUser] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    console.log(email);
    if (token && name && email) {
      localStorage.setItem("loggedInUser", name);
    }
    //else {
    //   // If no token is found, redirect to login page
    //   navigate("/");
    // }
    SetloggedInUser(localStorage.getItem("loggedInUser"));
  }, [location]);

  // useEffect(() => {
  //   SetloggedInUser(localStorage.getItem("loggedInUser"));
  // }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="v">
          <img src="/Frame 47.png" alt="frame" />
        </div>

        <nav>
          <div className="logo">
            <img src="/dashboard.png" alt="Google" /> Dashboard
          </div>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="header-info">
            <h2>Welcome back, {loggedInUser}!</h2>
            <p>Always stay updated in your student portal</p>
            <p className="date">10 July, 2024</p>
          </div>
          <div>
            <img src="/Boy icon.png" alt="submit" />
            <img src="/Plane.png" alt="submit" />
            <img src="/Submit now icon.png" alt="submit" />
          </div>
        </header>
        <section className="cards">
          <div className="card education-loan">
            <h3>Education Loan</h3>
            <p>
              Get loan on the best interest rates for your study abroad dream.
            </p>
            <button className="btn">Apply Now</button>
          </div>
          <div className="card credit-card">
            <h3>Credit Card</h3>
            <p>
              Get loan on the best interest rates for your study abroad dream.
            </p>
            <button className="btn">Apply Now</button>
          </div>
          <div className="card accommodation">
            <h3>Accommodation</h3>
            <p>Choose from best facility available in your own budget.</p>
            <button className="btn">Apply Now</button>
          </div>
          <div className="card community">
            <h3>Community</h3>
            <p>Join one of the best student communities and stay updated.</p>
            <button className="btn">Explore</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
