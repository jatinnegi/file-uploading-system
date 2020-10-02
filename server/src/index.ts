import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import { authRouter } from "./routes";
import { filesRouter } from "./routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/files", filesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
