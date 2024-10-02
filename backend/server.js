import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

import authRoutes from "./routes/auth.routes.js"; // only one import
import userRoutes from "./routes/user.routes.js"; // ensure to import this if using it

import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());  // to parse req.body
app.use(express.urlencoded({ extended: true }));  // to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // this should be correctly imported

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();

});

