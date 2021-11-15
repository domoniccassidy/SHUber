import * as api from "../api";

export const signIn = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    dispatch({ type: "AUTH", data });
    history.push("main");
  } catch (error) {
    if (userData.username == "" || userData.password == "") {
      dispatch({ type: "NULL_FIELD" });
    } else if (error.message == "Request failed with status code 404") {
      dispatch({ type: "INVALID_USERNAME" });
    } else {
      dispatch({ type: "INVALID_PASSWORD" });
    }
  }
};
export const signUp = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    dispatch({ type: "AUTH", data });
    history.push("main");
  } catch (error) {
    if (
      userData.username == "" ||
      userData.password == "" ||
      userData.confirmPassword == "" ||
      userData.email == ""
    ) {
      dispatch({ type: "NULL_FIELD" });
    } else if (userData.password !== userData.confirmPassword) {
      dispatch({ type: "PASSWORDS_NOT_MATCHING" });
    }
  }
};
