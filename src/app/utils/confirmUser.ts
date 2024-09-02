"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";

export default async function confirmUser(token : string) {
    const db_connect =  await connectDB()
    console.log(db_connect);
    if (!token) {
        return undefined
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded._id
        const username = decoded.username;
        return {token , username : username , userId : userId.toString()};
    }catch (err){
        console.log(err)
    }
}