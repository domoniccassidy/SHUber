import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FiSettings } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { reviewDriver } from "../actions/drivers";

const Driver = () => {
  const [driver, setDriver] = useState(
    JSON.parse(localStorage.getItem("drivers"))[0]
  );
  const [rating, setRating] = useState(() => {
    let amount = Number(0);
    driver.rating.map((rate) => {
      amount += Number(rate[1]);
    });

    return amount / driver.rating.length;
  });

  const [onScreen, setOnScreen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const history = useHistory();
  const dispatch = useDispatch();

  const payment = () => {
    history.push("/payment");
  };
  const home = () => {
    history.push("/main");
  };
  const logout = () => {
    setUser(null);
    dispatch({ type: "LOGOUT" });
  };
  const review = (rating) => {
    setRating(rating);
    dispatch(reviewDriver(driver._id, { ...user, rating: rating }));
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);
  return (
    <>
      {" "}
      <div className={`${onScreen ? "onScreen" : "menu"}`}>
        <ImCross size={35} onClick={() => setOnScreen(false)} />
        <h2 className="miniLogo orange">{user?.username}</h2>
        <ul className="settings">
          <li onClick={home}>Home</li>
          <li onClick={payment}>Payment</li>
          <li>Account</li>

          <li onClick={logout}>Log Out</li>
        </ul>
      </div>
      <div className="main">
        <div className="navbar">
          <FiSettings
            size={50}
            color={"#F"}
            onClick={() => setOnScreen(true)}
          />
          <h2 className="logo">{driver.name}'s Profile</h2>
        </div>

        <div className="imageContainer ">
          <h2 className="miniLogo ">Profile Picture</h2>
          <img
            className="driverPhoto"
            src={driver.photo}
            alt={`${driver.name}'s profile picture`}
          />
        </div>
        <div className="review">
          <h2 className="miniLogo">Rating</h2>{" "}
          <AiFillStar
            onClick={() => review(1)}
            className={rating > 0 && "check"}
          />
          <AiFillStar
            onClick={() => review(2)}
            className={rating > 1 && "check"}
          />
          <AiFillStar
            onClick={() => review(3)}
            className={rating > 2 && "check"}
          />
          <AiFillStar
            onClick={() => review(4)}
            className={rating > 3 && "check"}
          />
          <AiFillStar
            onClick={() => review(5)}
            className={rating > 4 && "check"}
          />
        </div>
      </div>
    </>
  );
};

export default Driver;
