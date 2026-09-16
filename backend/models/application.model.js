import mongoose from "mongoose";

// Represents a user's application to a specific job posting
const applicationSchema = new mongoose.Schema({
    // Reference to the job being applied to
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    // Reference to the user (student) who submitted the application
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // Application review status; starts as 'pending' until an admin/recruiter updates it
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true}); // Adds createdAt / updatedAt fields automatically
export const Application  = mongoose.model("Application", applicationSchema);
