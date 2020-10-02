"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Routes
const routes_1 = require("./routes");
const routes_2 = require("./routes");
const app = express_1.default();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
// Routes
app.use("/api/auth", routes_1.authRouter);
app.use("/api/files", routes_2.filesRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});
