import "dotenv/config";
import "./database/connect.js";
import express from "express";
import authRouter from './routes/auth.routes.js'

const app = express();

app.use(express.json());

app.use('/api/v1', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log("http://localhost:" + PORT));
