import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from "../actions/users";

const initForm = {
  username: "",
  password: "",
};

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  const [userData, setUserData] = useState(initForm);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((state) => state.errors);

  useEffect(() => {
    if (user) {
      history.push("/main");
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignUp) dispatch(signIn(userData, history));
    else dispatch(signUp(userData, history));
  };

  return (
    <>
      <div className="main">
        <div className="navbar">
          <div className="icon">
            <h2 className="logo">SHUber</h2>
          </div>
        </div>
        <div className="content">
          <h1>
            WELCOME TO <br />
            <span>SHUber</span>
          </h1>
          <p className="details">
            This is SHUber, the best modern taxi system you ever got your eyes
            onto,
            <br />
            SO SIGN UP NOW to order your first ride!!
            <br />
            Only Positive vibes, when there are positive rides...
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <h2>Login Here</h2>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            {isSignUp && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
              </>
            )}
            {error != "" && <p className="errorMessage">{error}</p>}
            <button type="submit" className="btn2">
              Login
            </button>

            <p className="link">
              {!isSignUp ? "Don't" : "Already"} have an account?
              <br />
              <a
                onClick={() => {
                  dispatch({ type: "RESET" });
                  setIsSignUp(!isSignUp);
                }}
              >
                Sign {!isSignUp ? "up" : "in"} here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
