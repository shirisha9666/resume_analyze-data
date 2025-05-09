import {v2 as cloudinary} from "cloudinary"

import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name:process.env.Cloudinary_CLOUD_NAME,
     api_key:process.env.Cloudinary_API_KEY?"OK":"MISSING",
    api_secret:process.env.Cloudinary_API_Secret?"OK":"MISSING"
})

export default cloudinary