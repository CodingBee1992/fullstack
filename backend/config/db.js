import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Successfully connect to MONGODB');
    } catch (error) {
        console.log(`${error} did not connect`);
        process.exit(1)
    }
}

export default connectDB