import * as api from "../api";

export const signIn = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    dispatch({ type: "AUTH", data: data.user });
    pendo.track("user_signed_in", {
      username: userData.username,
      login_method: "standard",
    });
    history.push("main");
  } catch (error) {
    if (userData.username == "" || userData.password == "") {
      pendo.track("sign_in_failed", {
        failure_reason: "empty_fields",
        username_provided: Boolean(userData.username),
      });
      dispatch({ type: "NULL_FIELD" });
    } else if (error.message == "Request failed with status code 404") {
      pendo.track("sign_in_failed", {
        failure_reason: "invalid_username",
        username_provided: true,
      });
      dispatch({ type: "INVALID_USERNAME" });
    } else {
      pendo.track("sign_in_failed", {
        failure_reason: "invalid_password",
        username_provided: true,
      });
      dispatch({ type: "INVALID_PASSWORD" });
    }
  }
};
export const signUp = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    dispatch({ type: "AUTH", data: data.user });
    pendo.track("user_signed_up", {
      username: userData.username,
      email: userData.email,
      signup_method: "standard",
    });
    history.push("main");
  } catch (error) {
    if (
      userData.username == "" ||
      userData.password == "" ||
      userData.confirmPassword == "" ||
      userData.email == ""
    ) {
      pendo.track("sign_up_failed", {
        failure_reason: "empty_fields",
      });
      dispatch({ type: "NULL_FIELD" });
    } else if (userData.password !== userData.confirmPassword) {
      pendo.track("sign_up_failed", {
        failure_reason: "passwords_not_matching",
      });
      dispatch({ type: "PASSWORDS_NOT_MATCHING" });
    }
  }
};
export const verifyCard = (user,history) => async (dispatch) => {
  const { data } = await api.verifyCard(user._id);
  dispatch({ type: "AUTH", data });
  history.push("main")
};
