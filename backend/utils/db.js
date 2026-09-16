import mongoose from "mongoose";

// Establishes a connection to MongoDB using the URI from environment variables.
// Called once at server startup.
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;
