import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Company routes — all require authentication
// POST /register - create a new company (owned by the logged-in recruiter)
router.route("/register").post(isAuthenticated,registerCompany);
// GET /get - get all companies owned by the logged-in user
router.route("/get").get(isAuthenticated,getCompany);
// GET /get/:id - get a single company's details by ID
router.route("/get/:id").get(isAuthenticated,getCompanyById);
// PUT /update/:id - update a company's profile, including a logo upload (multer handles the file)
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;
