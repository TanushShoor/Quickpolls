// backend/cofig/db.js
import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.dbUrl);
        console.log("MongoDB connected")
    }
    catch(error){
        console.error("MongoDb connection failed", error)
        process.exit(1);
    }
}
export default connectDB;
