import express from "express";
import { signup, logIn, verifyCard, verifyEmail } from "../controllers/user.js";
const router = express.Router();

router.post(
  "/signin",
  (req, res, next) => {
    console.log(
      `Request from: ${req.originalUrl}, Request type: ${req.method}`
    );
    next();
  },
  logIn
);
router.post(
  "/signup",
  (req, res, next) => {
    console.log(
      `Request from: ${req.originalUrl}, Request type: ${req.method}`
    );
    next();
  },
  signup
);
router.put(
  "/verify/:id",
  (req, res, next) => {
    console.log(
      `Request from: ${req.originalUrl}, Request type: ${req.method}`
    );
    next();
  },
  verifyCard
);
router.put(
  "/email/:id",
  (req, res, next) => {
    console.log(
      `Request from: ${req.originalUrl}, Request type: ${req.method}`
    );
    next();
  },
  verifyEmail
);

export default router;
