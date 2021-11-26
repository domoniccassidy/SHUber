import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Payment from "./Components/Payment";
import { getDrivers } from "./actions/drivers";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDrivers());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/main" exact component={Main} />
        <Route path="/payment" exact component={Payment} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
