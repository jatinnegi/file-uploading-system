"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileValidator = exports.LoginValidator = exports.RegistrationValidator = void 0;
const check_1 = require("express-validator/check");
const fs_1 = __importDefault(require("fs"));
const db_1 = __importDefault(require("../db"));
exports.RegistrationValidator = [
    check_1.check("email", "Enter a valid email").isEmail(),
    check_1.check("username", "Username must have atleast 6 characters").isLength({
        min: 6,
    }),
    check_1.check("password", "Password must have atleast 6 characters").isLength({
        min: 6,
    }),
    check_1.body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true; // No errors
    }),
    check_1.body("email").custom(async (value, { req }) => {
        try {
            const results = await db_1.default.query("select * from users where email=$1", [
                value,
            ]);
            if (results.rows.length > 0) {
                throw new Error("Email is already registered");
            }
            else
                return true;
        }
        catch (error) {
            throw error;
        }
    }),
    check_1.body("username").custom(async (value, { req }) => {
        try {
            const results = await db_1.default.query("select * from users where username=$1", [
                value,
            ]);
            console.log("custom validator");
            console.log(results.rows.length);
            if (results.rows.length > 0) {
                throw new Error("Username is already taken");
            }
            else
                return true;
        }
        catch (error) {
            throw error;
        }
    }),
];
exports.LoginValidator = [
    check_1.check("usernameOrEmail", "Enter your username or email").not().isEmpty(),
    check_1.check("password", "Enter your password").not().isEmpty(),
];
exports.UploadFileValidator = (req, res, next) => {
    try {
        const { title } = req.body;
        let errors = [];
        if (req.file === undefined) {
            errors.push({ msg: "Upload a pdf file" });
        }
        else {
            if (req.file.mimetype !== "application/pdf") {
                const filepath = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${req.user.id}/${req.filename}`;
                fs_1.default.unlinkSync(filepath);
                errors.push({ msg: "Upload a pdf file" });
            }
        }
        if (title === "") {
            const filepath = `C:/users/jatin/dev/typescript-express/file-uploading-system/server/uploads/${req.user.id}/${req.filename}`;
            fs_1.default.unlinkSync(filepath);
            errors.push({ msg: "Title is required" });
        }
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    }
    catch (err) {
        const errors = [{ msg: "Upload a pdf file" }, { msg: "Title is required" }];
        return res.status(400).json({ errors });
    }
};
