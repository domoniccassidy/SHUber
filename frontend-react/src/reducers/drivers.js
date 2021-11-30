export default (drivers = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      localStorage.setItem("drivers", JSON.stringify(action.payload));
      return action.payload;
    case "REVIEW":
      const tempDrivers = drivers.filter(
        (driver) => driver._id != action.payload._id
      );
      localStorage.setItem(
        "drivers",
        JSON.stringify([...tempDrivers, action.payload])
      );
      return [...tempDrivers, action.payload];
    default:
      return drivers;
  }
};
