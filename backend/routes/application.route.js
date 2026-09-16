import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

// Application routes — all require authentication
// GET /apply/:id - apply to a job (uses GET, though this creates data — see note below)
router.route("/apply/:id").get(isAuthenticated, applyJob);
// GET /get - get the logged-in user's own applied jobs
router.route("/get").get(isAuthenticated, getAppliedJobs);
// GET /:id/applicants - get all applicants for a given job (admin/recruiter view)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// POST /status/:id/update - update an application's status (admin/recruiter action)
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;
