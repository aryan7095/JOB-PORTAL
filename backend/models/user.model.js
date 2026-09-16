import mongoose from "mongoose";

// Represents a platform user, either a job-seeking student or a recruiter
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    // Must be unique across all users; used for login
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    // Stores the bcrypt-hashed password (never plaintext — see userController.register)
    password:{
        type:String,
        required:true,
    },
    // Determines account type/permissions; chosen at registration and checked again at login
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    // Nested profile info, relevant fields differ by role
    // (students use resume/skills/bio; recruiters use company)
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        // Reference to the company this user (recruiter) manages, if any
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true}); // Adds createdAt / updatedAt fields automatically
export const User = mongoose.model('User', userSchema);
