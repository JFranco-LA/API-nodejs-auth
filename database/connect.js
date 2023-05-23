import "dotenv/config";
import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Connect DB ok");
} catch (error) {
  console.log("Error connecting" + error);
}
