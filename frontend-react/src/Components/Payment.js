import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { verifyCard } from "../actions/users";

const initForm = {
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

export const Payment = () => {
  const [onScreen, setOnScreen] = useState(false);
  const [userData, setUserData] = useState(initForm);
  const [error, setError] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userData.cardNumber == "" ||
      userData.expiryDate == "" ||
      userData.cvv == ""
    ) {
      setError("Please ensure that you fill in all of the forms");
    } else if (userData.cardNumber.length != 16 || isNaN(userData.cardNumber)) {
      setError("The card number is not valid");
    } else if (userData.cvv.length !== 3 || isNaN(userData.cvv)) {
      setError("The cvv is not valid");
    } else {
      dispatch(verifyCard(user, history));
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
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

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);
  return (
    <>
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
          <h2 className="logo">Payment Details</h2>
        </div>
        <form
          className="form"
          style={{ marginTop: "10vh" }}
          onSubmit={handleSubmit}
        >
          <h2>Card Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Enter 16 digit number"
            onChange={handleChange}
          />
          <input
            type="month"
            name="expiryDate"
            min="2021-12"
            max="2026-12"
            placeholder="Enter expiry date"
            onChange={handleChange}
          />{" "}
          <input
            type="text"
            name="cvv"
            placeholder="Enter CVV"
            onChange={handleChange}
          />
          <button type="submit" className="btn2">
            Enter
          </button>
          {error != "" && (
            <p className="errorMessage" style={{ marginBottom: "1vh" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export const MiniPayment = () => {
  const [userData, setUserData] = useState(initForm);
  const [error, setError] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userData.cardNumber == "" ||
      userData.expiryDate == "" ||
      userData.cvv == ""
    ) {
      setError("Please ensure that you fill in all of the forms");
    } else if (userData.cardNumber.length != 16 || isNaN(userData.cardNumber)) {
      setError("The card number is not valid");
    } else if (userData.cvv.length !== 3 || isNaN(userData.cvv)) {
      setError("The cvv is not valid");
    } else {
      dispatch(verifyCard(user, history));
      dispatch({ type: "CLEAR" });
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="form"
      style={{ marginTop: "10vh" }}
      onSubmit={handleSubmit}
    >
      <h2>Card Details</h2>
      <input
        type="text"
        name="cardNumber"
        placeholder="Enter 16 digit number"
        onChange={handleChange}
      />
      <input
        type="month"
        name="expiryDate"
        min="2021-12"
        max="2026-12"
        placeholder="Enter expiry date"
        onChange={handleChange}
      />{" "}
      <input
        type="text"
        name="cvv"
        placeholder="Enter CVV"
        onChange={handleChange}
      />
      <button type="submit" className="btn2">
        Enter
      </button>
      {error != "" && (
        <p className="errorMessage" style={{ marginBottom: "1vh" }}>
          {error}
        </p>
      )}
    </form>
  );
};
