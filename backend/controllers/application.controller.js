import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// POST /apply/:id - lets a logged-in user apply to a job, preventing duplicate applications
export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // set by auth middleware (not shown) from the decoded JWT
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        // link the new application to the job's applications list
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        // Note: no res.status(500) sent here — if an error occurs, the request will hang
        // without a response since only console.log(error) runs in the catch block
        console.log(error);
    }
};

// GET /applied-jobs - returns all jobs the logged-in user has applied to,
// with job and company details populated, newest first
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        // Note: Application.find() returns an array (never null/undefined), so this check
        // effectively never triggers even when there are zero applications (empty array is truthy)
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin dekhega kitna user ne apply kiya hai
// (admin will see how many users have applied)
// GET /applicants/:id - admin-facing: returns a job along with all its applicants' details
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true // note: typo in key name, should probably be "success"
        });
    } catch (error) {
        console.log(error);
    }
}

// PUT /update-status/:id - admin action to update an applicant's application status
// (e.g. accepted/rejected)
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        // Normalize to lowercase for consistent storage/comparison
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}
