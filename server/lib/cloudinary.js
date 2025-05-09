import {v2 as cloudinary} from "cloudinary"

import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name:process.env.Cloudinary_CLOUD_NAME,
     api_key:process.env.Cloudinary_API_KEY,
    api_secret:process.env.Cloudinary_API_Secret
})

export default cloudinary