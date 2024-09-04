"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {string} from "prop-types";

export interface User {
    username: string;
    userId: string;
}

export default async function confirmUser(token: string) {
    await connectDB()

    if (!token) {
        throw new Error("Token is required");
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        // decodedの中身（例）テスト{
        //   userId: '66d4f569d06498d8d6dd5539',
        //   username: 'テスト',
        //   email: 'aaa@aaa',
        //   iat: 1725325419,
        //   exp: 1725498219
        // }
        const userId: User = decoded.userId
        const username: User = decoded.username;
        // console.log(typeof userId , typeof  username , typeof  token);
        return {token, username: username!, userId: userId.toString()};
    } catch (err) {
        console.log(err)
        return null

    }
}