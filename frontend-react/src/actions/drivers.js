import * as api from "../api";

export const getDrivers = () => async (dispatch) => {
  try {
    const { data } = await api.getDrivers();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (e) {
    console.log(e);
  }
};
export const reviewDriver = (id, userData) => async (dispatch) => {
  try {
    const { data } = await api.review(id, userData);
    dispatch({ type: "REVIEW", payload: data });
  } catch (e) {
    console.log(e);
  }
};
