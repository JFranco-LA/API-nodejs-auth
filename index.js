import "dotenv/config";
import "./database/connect.js";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
//example login
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log("👌 http://localhost:" + PORT));
