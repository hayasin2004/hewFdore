"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {string} from "prop-types";
import {UserType} from "@/app/api/user/catchUser/route";
import {User} from "@/models/User";

export default async function confirmUser(token?: string):Promise< string  | null>  {

    await connectDB()
    if (!token) {
        return null;
    }
    try {
        const decoded : string | null = await jwt.verify(token, process.env.SECRET_KEY);
        const userData = await User.findById(decoded?.userId)


         return JSON.stringify(userData)
    } catch (err) {
        console.log(err)
        return null

    }
}

