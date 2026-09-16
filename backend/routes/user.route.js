import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

// User/auth routes
// POST /register - create a new account with a mandatory profile photo upload (public, no auth needed yet)
router.route("/register").post(singleUpload,register);
// POST /login - authenticate with email/password/role (public)
router.route("/login").post(login);
// GET /logout - clear the auth cookie (uses GET, though this is a state-changing action — see note below)
router.route("/logout").get(logout);
// POST /profile/update - update the logged-in user's profile, with an optional resume upload (auth required)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
