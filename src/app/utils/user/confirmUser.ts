"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

export default async function confirmUser(token: string)  {
    await connectDB()
    if (!token) {
        return null;
    }
    try {
        const decoded  = await jwt.verify(token, process.env.SECRET_KEY);
        const userData = await User.findById(decoded?.userId)

         return JSON.stringify(userData)
    } catch (err) {
        console.log(err)
        return null
    }
}

