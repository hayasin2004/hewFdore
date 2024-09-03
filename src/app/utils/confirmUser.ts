"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";

interface User {
    username: string;
    userId : string;
}

export default async function confirmUser(token : string) {
    const db_connect =  await connectDB()
    console.log(db_connect);
    if (!token) {
        throw new Error("Token is required");
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId : User = decoded._id
        const username :User = decoded.username;
        return {token , username : username , userId : userId.toString()};
    }catch (err){
        console.log(err)
    }
}