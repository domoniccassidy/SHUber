import mongoose from "mongoose";
import UserProfile from "../models/userModel.js";

export const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserProfile.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = existingUser.password == password;

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    res.status(200).json({ user: existingUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;
  try {
    const existingUser = await UserProfile.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This username is already taken!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "The passwords do not match!" });
    }

    const user = await UserProfile.create({
      username,
      password,
      email,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyCard = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send("No user with that id");
  }

  const updatedUser = await UserProfile.findByIdAndUpdate(
    _id,
    { cardVerified: true },
    {
      new: true,
    }
  );
  res.json(updatedUser);
};

export const verifyEmail = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await UserProfile.findOneAndUpdate(
    id,
    { emailVerified: true },
    { new: true }
  );
  res.json(updatedUser);
};
