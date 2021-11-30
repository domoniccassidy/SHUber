import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import drivers from "./routes/drivers.js";
import users from "./routes/users.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next(), app.use("/drivers", drivers), app.use("/users", users);
});

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((e) => {
    console.log(e.message);
  });
