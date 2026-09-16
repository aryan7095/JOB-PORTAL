import mongoose from "mongoose";

// Represents a company profile, created and owned by a recruiter user
const companySchema = new mongoose.Schema({
    // Company name; must be unique across all companies
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo
    },
    // Reference to the recruiter (User) who registered/owns this company
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true}) // Adds createdAt / updatedAt fields automatically
export const Company = mongoose.model("Company", companySchema);
