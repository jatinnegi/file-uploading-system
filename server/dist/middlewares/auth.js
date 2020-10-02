"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../constants"));
exports.auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No Token, authorization denied" });
    }
    try {
        jsonwebtoken_1.default.verify(token, constants_1.default.myJwtSecret, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ msg: "Invalid token, authorization denied" });
            }
            else {
                req.user = decoded;
            }
        });
        next();
    }
    catch (err) {
        console.log("something wrong with auth middleware");
        return res.status(500).send("Server error");
    }
};
