export default (drivers = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      localStorage.setItem("drivers", JSON.stringify(action.payload));
      return action.payload;
    default:
      return drivers;
  }
};
