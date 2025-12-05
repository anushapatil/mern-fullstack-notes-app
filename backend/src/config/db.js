import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected sucessfully!");
    } catch(error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // exit with failure
    }
}