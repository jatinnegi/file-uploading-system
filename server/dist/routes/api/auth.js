"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const check_1 = require("express-validator/check");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../db"));
const constants_1 = __importDefault(require("../../constants"));
exports.router = express_1.default.Router({ strict: true });
// @route   GET api/auth
// @desc    Get current user
// @access  Private
exports.router.get("/", middlewares_1.auth, async (req, res) => {
    const id = req.user.id;
    try {
        const results = await db_1.default.query(`select id,username,email from users where id=$1`, [id]);
        const user = results.rows[0];
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Server error");
    }
});
// @route   Post api/auth/register
// @desc    Create a new user
// @access  Public
exports.router.post("/register", middlewares_1.RegistrationValidator, async (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, username, password } = req.body;
    try {
        const results = await db_1.default.query(`insert into users (email,username,password) values ($1,$2, crypt($3, gen_salt('bf'))) returning id`, [email, username, password]);
        const newUser = results.rows[0];
        const payload = {
            id: newUser.id,
        };
        jsonwebtoken_1.default.sign(payload, constants_1.default.myJwtSecret, (err, token) => {
            if (err)
                throw err;
            return res.status(201).json({ token });
        });
    }
    catch (error) {
        return res.status(500).send("Server error");
    }
});
// @route   Post api/auth/login
// @desc    Login a user
// @access  Public
exports.router.post("/login", middlewares_1.LoginValidator, async (req, res) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { usernameOrEmail, password } = req.body;
    try {
        let results = await db_1.default.query(`select password=crypt($1,password) as exists from users where username=$2 or email=$2`, [password, usernameOrEmail]);
        if (results.rows.length === 0) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const user = results.rows[0];
        if (!user.exists) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        else {
            results = await db_1.default.query(`select id from users where username=$1 or email=$1`, [usernameOrEmail]);
            const newUser = results.rows[0];
            const payload = {
                id: newUser.id,
            };
            jsonwebtoken_1.default.sign(payload, constants_1.default.myJwtSecret, (err, token) => {
                if (err)
                    throw err;
                return res.status(200).json({ token });
            });
        }
    }
    catch (error) {
        return res.status(500).send("Server error");
    }
});
