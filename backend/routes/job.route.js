import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

// Job routes — all require authentication
// POST /post - create a new job listing (recruiter/admin action)
router.route("/post").post(isAuthenticated, postJob);
// GET /get - search/list all job postings (supports ?keyword= query param)
router.route("/get").get(isAuthenticated, getAllJobs);
// GET /getadminjobs - get all jobs created by the logged-in admin/recruiter
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// GET /get/:id - get a single job's details by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
