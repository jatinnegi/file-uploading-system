import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Constants from "../constants";

export const auth: RequestHandler = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }
  try {
    jwt.verify(token, Constants.myJwtSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ msg: "Invalid token, authorization denied" });
      } else {
        req.user = <JwtUser>decoded;
      }
    });
    next();
  } catch (err) {
    console.log("something wrong with auth middleware");
    return res.status(500).send("Server error");
  }
};
