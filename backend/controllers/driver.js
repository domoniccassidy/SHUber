import mongoose from "mongoose";
import DriverProfile from "../models/driverModel.js";

export const getDrivers = async (req, res) => {
  try {
    const driverProfiles = await DriverProfile.find();
    res.json(driverProfiles);
  } catch (e) {
    res.json({ message: e.message });
  }
};
export const reviewDriver = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.json({ error: "No driver with that id" });
  }
  try {
    const driver = await DriverProfile.findById(_id);

    const index = driver.rating.findIndex(
      (rating) => rating[0] === String(req.body.username)
    );
    if (index === -1) {
      // adding a rating
      driver.rating.push([req.body.username, req.body.rating]);
    } else {
      // changing a rating
      driver.rating = driver.rating.filter(
        (rating) => rating[0] !== String(req.body.username)
      );
      driver.rating.push([req.body.username, req.body.rating]);
    }
    const updatedDriver = await DriverProfile.findByIdAndUpdate(_id, driver, {
      new: true,
    });
    res.json(updatedDriver);
  } catch (e) {
    res.json({ message: e.message });
  }
};
