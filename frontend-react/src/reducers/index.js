import { combineReducers } from "redux";

import drivers from "./drivers";
import user from "./users";
import errors from "./errors";

export default combineReducers({ drivers, user, errors });
