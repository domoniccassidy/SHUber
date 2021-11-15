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

export const addUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserProfile(user);

  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};
