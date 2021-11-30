import express from "express";
import { getDrivers, reviewDriver } from "../controllers/driver.js";
const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    console.log(
      `Request from: ${req.originalUrl}, Request type: ${req.method}`
    );
    next();
  },
  getDrivers
);
router.patch(
  "/:id",
  (req, res, next) => {
    console.log(
      `Request from: ${req.originalUrl}, Request type: ${req.method}`
    );
    next();
  },
  reviewDriver
);
export default router;
