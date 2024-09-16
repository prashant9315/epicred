import React, { useState } from "react";
import Toggle from "./Toggle";
import SignIn from "./SignIn";
import Signup from "./Signup";

const Home = () => {
  const [activeTab, setActiveTab] = useState("signin");
  return (
    <div>
      {activeTab === "signin" ? <SignIn /> : <Signup />}
      <Toggle func={setActiveTab} />
    </div>
  );
};

export default Home;
