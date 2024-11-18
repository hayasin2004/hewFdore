"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {string} from "prop-types";

export interface User {
    token :string;
    username: string;
    email : string;
    userId: string;
    profilePicture :string;
}

export default async function confirmUser(token?: string) :Promise<User | null> {

    await connectDB()
    console.log("うすいけんた")
    if (!token) {
        return null;

    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        // decodedの中身（例）テスト{
        //   userId: '66d4f569d06498d8d6dd5539',
        //   username: 'テスト',
        const userId  = decoded.userId
        const username= decoded.username;
        const email = decoded.email;
        const profilePicture = decoded.profilePicture
        // console.log(typeof userId , typeof  username , typeof  token);
        return {token, username: username, userId: userId.toString() , email , profilePicture};
    } catch (err) {
        console.log(err)
        return null

    }
}

