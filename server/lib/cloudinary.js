import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

export default cloudinary;
