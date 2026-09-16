import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables from .env
dotenv.config({});

const app = express();

// middleware
// Parses incoming JSON request bodies (req.body)
app.use(express.json());
// Parses URL-encoded form bodies (e.g. traditional HTML form submissions)
app.use(express.urlencoded({extended:true}));
// Parses cookies from incoming requests into req.cookies (needed by isAuthenticated middleware)
app.use(cookieParser());
// CORS config: only allow requests from the Vite dev server's default port,
// and allow cookies/credentials to be sent cross-origin (needed for the auth cookie)
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

// Port to listen on, from env vars or defaulting to 3000
const PORT = process.env.PORT || 3000;


// api's
// Mount each route module under its respective versioned base path
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



// Start the server, then connect to the database once listening begins
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
