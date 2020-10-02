import { RequestHandler } from "express";
import { ValidationChain, check, body } from "express-validator/check";
import fs from "fs";
import db from "../db";

interface FileUploadError {
  msg: string;
}

export const RegistrationValidator: ValidationChain[] = [
  check("email", "Enter a valid email").isEmail(),
  check("username", "Username must have atleast 6 characters").isLength({
    min: 6,
  }),
  check("password", "Password must have atleast 6 characters").isLength({
    min: 6,
  }),
  body("password2").custom((value: string, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true; // No errors
  }),
  body("email").custom(async (value, { req }) => {
    try {
      const results = await db.query("select * from users where email=$1", [
        value,
      ]);
      if (results.rows.length > 0) {
        throw new Error("Email is already registered");
      } else return true;
    } catch (error) {
      throw error;
    }
  }),
  body("username").custom(async (value, { req }) => {
    try {
      const results = await db.query("select * from users where username=$1", [
        value,
      ]);
      console.log("custom validator");
      console.log(results.rows.length);
      if (results.rows.length > 0) {
        throw new Error("Username is already taken");
      } else return true;
    } catch (error) {
      throw error;
    }
  }),
];

export const LoginValidator: ValidationChain[] = [
  check("usernameOrEmail", "Enter your username or email").not().isEmpty(),
  check("password", "Enter your password").not().isEmpty(),
];

export const UploadFileValidator: RequestHandler = (req, res, next) => {
  try {
    const { title } = req.body;
    let errors: FileUploadError[] = [];

    if (req.file === undefined) {
      errors.push({ msg: "Upload a pdf file" });
    } else {
      if (req.file.mimetype !== "application/pdf") {
        const filepath = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${req.user.id}/${req.filename}`;
        fs.unlinkSync(filepath);
        errors.push({ msg: "Upload a pdf file" });
      }
    }
    if (title === "") {
      const filepath = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${req.user.id}/${req.filename}`;
      fs.unlinkSync(filepath);
      errors.push({ msg: "Title is required" });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (err) {
    const errors = [{ msg: "Upload a pdf file" }, { msg: "Title is required" }];
    return res.status(400).json({ errors });
  }
};
