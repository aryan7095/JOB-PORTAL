import mongoose from "mongoose";

// Represents a job posting created by a recruiter
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // List of job requirements (stored as an array of strings, split from a
    // comma-separated input string in jobController.postJob)
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    // Numeric experience level requirement (e.g. years of experience)
    experienceLevel:{
        type:Number,
        required:true,
    },
    location: {
        type: String,
        required: true
    },
    // Employment type (e.g. full-time, part-time, internship) — stored as free-text string
    jobType: {
        type: String,
        required: true
    },
    // Number of open positions for this job
    position: {
        type: Number,
        required: true
    },
    // Reference to the company this job belongs to
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    // Reference to the recruiter/admin user who created this job posting
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // List of applications submitted for this job (populated with applicant details when needed)
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
},{timestamps:true}); // Adds createdAt / updatedAt fields automatically
export const Job = mongoose.model("Job", jobSchema);
