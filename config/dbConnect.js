import mongoose from "mongoose";
const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully: ${connect.connection.host},${connect.connection.port}`);
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
}
export default dbConnect;