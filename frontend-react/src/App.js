import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Main from "./Components/Main";

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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
