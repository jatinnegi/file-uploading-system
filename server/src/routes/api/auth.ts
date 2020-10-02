import express, { Request, Response } from "express";
import { auth, RegistrationValidator, LoginValidator } from "../../middlewares";
import { validationResult } from "express-validator/check";
import jwt from "jsonwebtoken";
import db from "../../db";
import Constants from "../../constants";

export const router = express.Router({ strict: true });

// @route   GET api/auth
// @desc    Get current user
// @access  Private
router.get("/", auth, async (req: Request, res: Response) => {
  const id = req.user.id!;

  try {
    const results = await db.query(
      `select id,username,email from users where id=$1`,
      [id]
    );

    const user = results.rows[0];

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// @route   Post api/auth/register
// @desc    Create a new user
// @access  Public
router.post(
  "/register",
  RegistrationValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    try {
      const results = await db.query(
        `insert into users (email,username,password) values ($1,$2, crypt($3, gen_salt('bf'))) returning id`,
        [email, username, password]
      );

      const newUser = <ResultUser>results.rows[0];

      const payload = {
        id: newUser.id,
      };

      jwt.sign(payload, Constants.myJwtSecret, (err, token) => {
        if (err) throw err;

        return res.status(201).json({ token });
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
);

// @route   Post api/auth/login
// @desc    Login a user
// @access  Public
router.post("/login", LoginValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usernameOrEmail, password } = req.body;
  try {
    let results = await db.query(
      `select password=crypt($1,password) as exists from users where username=$2 or email=$2`,
      [password, usernameOrEmail]
    );

    if (results.rows.length === 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const user = <ResultUser>results.rows[0];

    if (!user.exists) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    } else {
      results = await db.query(
        `select id from users where username=$1 or email=$1`,
        [usernameOrEmail]
      );

      const newUser = <ResultUser>results.rows[0];

      const payload = {
        id: newUser.id,
      };

      jwt.sign(payload, Constants.myJwtSecret, (err, token) => {
        if (err) throw err;

        return res.status(200).json({ token });
      });
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
});
