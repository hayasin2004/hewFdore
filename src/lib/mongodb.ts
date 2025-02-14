import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection =  await mongoose.connect(process.env.MONGODB_URI!);
        // console.log("Connected to MongoDB..." + JSON.stringify(tets));
        return connection;
    } catch (error) {
        //console.log("エラー");
        //console.log(error);
        return Promise.reject(error);
    }
}




