import * as api from "../api";

export const signIn = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    dispatch({ type: "AUTH", data: data.user });

    // Initialize Pendo with authenticated visitor data
    if (window.pendo) {
      window.pendo.initialize({
        visitor: {
          id: data.user._id,
          email: data.user.email,
          username: data.user.username,
          emailVerified: data.user.emailVerified,
          cardVerified: data.user.cardVerified,
        },
      });
    }

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
    dispatch({ type: "AUTH", data: data.user });

    // Initialize Pendo with authenticated visitor data
    if (window.pendo) {
      window.pendo.initialize({
        visitor: {
          id: data.user._id,
          email: data.user.email,
          username: data.user.username,
          emailVerified: data.user.emailVerified,
          cardVerified: data.user.cardVerified,
        },
      });
    }

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
export const verifyCard = (user,history) => async (dispatch) => {
  const { data } = await api.verifyCard(user._id);
  dispatch({ type: "AUTH", data });
  history.push("main")
};
