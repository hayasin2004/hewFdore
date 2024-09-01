"use server"
import mongoose from "mongoose";
import {User} from "@/models/User"
import {string} from "prop-types";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log("エラー");
        console.log(error);
        return Promise.reject(error);
    }
}


// export async function createUser() {
//
//     await  mongoose.connect(process.env.MONGODB_URI!);
//     const newUser = new User({ userId : "1asdfasfasdfdfasdfdaaffasdfasff", username : "aaasdfasdfsadfwdsfsfsdafsdfsdfaa", password: "test123", email: "test@asdfasdfdsfsftest.com" });
//     await  newUser.save()
//     // console.log(newUser)
// }
// createUser().catch(err => console.log(err));




