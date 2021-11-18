import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { ImCross } from "react-icons/im";
const Main = () => {
  const [onScreen, setOnScreen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")).user;

  return (
    <>
      <div className={`${onScreen ? "onScreen" : "menu"}`}>
        <ImCross size={35} onClick={() => setOnScreen(false)} />
        <h2 className="miniLogo orange">{user.username}</h2>

        <ul className="settings">
          <li>Theme</li>
          <li>Payment</li>
          <li>Change Email</li>
          <li>Change Password</li>
        </ul>
      </div>
      <div className="main">
        <div className="navbar">
          <FiSettings
            size={50}
            color={"#F"}
            onClick={() => setOnScreen(true)}
          />
          <h2 className="logo">Dashboard</h2>
        </div>
      </div>
    </>
  );
};

export default Main;
