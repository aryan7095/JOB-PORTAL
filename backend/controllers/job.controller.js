import { Job } from "../models/job.model.js";

// admin post krega job
// (admin will post the job)
// POST /post - admin/recruiter creates a new job listing
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id; // set by auth middleware (not shown) from the decoded JWT — the creator's ID

        // Require all fields to be present before creating the job
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            // requirements is expected as a comma-separated string, split into an array
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience, // renamed from "experience" to match the schema field
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// student k liye
// (for the student/job-seeker)
// GET /jobs - public job listing search, with optional keyword search on title/description
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        // Case-insensitive partial match on either title or description
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        // Note: Job.find() returns an array (never null/undefined), so this check
        // effectively never triggers even when there are zero matching jobs (empty array is truthy)
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// student
// GET /get/:id - returns a single job's details along with its applications, for a student to view
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitne job create kra hai abhi tk
// (how many jobs has the admin created so far)
// GET /getadminjobs - returns all jobs created by the currently logged-in admin/recruiter
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1 // Note: this isn't a valid populate option — populate() expects things
                         // like `select`, `match`, or `options: { sort: ... }`; a bare `createdAt: -1`
                         // key here is likely ignored by Mongoose rather than actually sorting anything
        });
        // Note: Job.find() returns an array (never null/undefined), so this check
        // effectively never triggers even when the admin has created zero jobs
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
