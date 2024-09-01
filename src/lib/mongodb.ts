import mongoose from "mongoose";
import {User} from "@/models/User"
import {string} from "prop-types";
import {NextApiRequest, NextApiResponse} from "next";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log("エラー");
        console.log(error);
        return Promise.reject(error);
    }
}




