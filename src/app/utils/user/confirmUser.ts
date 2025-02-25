"use server"
import jwt, {JwtPayload} from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";


export default async function confirmUser(token: string) {
    await connectDB()
    if (!token) {
        return null;
    }
    try {
        const decoded: string | JwtPayload = await jwt.verify(token, process.env.SECRET_KEY!);
        if (typeof decoded !== "string") {
            const userData: string | null = await User.findById(decoded?.userId)
            return JSON.stringify(userData)
        }


    } catch (err) {
        console.log(err)
        return null
    }
}

