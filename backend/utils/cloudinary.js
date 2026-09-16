import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
// Load environment variables (CLOUD_NAME, API_KEY, API_SECRET) from .env
dotenv.config();

// Configure the Cloudinary SDK with credentials from environment variables,
// so it can be used elsewhere (e.g. for uploading profile photos, resumes, and company logos)
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
export default cloudinary;
