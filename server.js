import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import webRouter from "./routers/webRouter.js";
import imageRouter from "./routers/imageRouter.js";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";

const app = express();
dotenv.config();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

// ROUTERS
app.use("/api/v1/products", authenticateUser, productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/order", authenticateUser, orderRouter);
app.use("/api/v1/web", authenticateUser, webRouter);
app.use("/api/v1/images", authenticateUser, imageRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
// ERROR
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
