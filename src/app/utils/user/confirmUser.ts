"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {string} from "prop-types";

// export interface User {
//     token? :string;
//     username?: string;
//     email? : string;
//     _id?: string | null;
//     profilePicture? :string;
// }

export default async function confirmUser(token?: string) :Promise<{
    profilePicture: string | null;
    _id: string | null;
    email: string | null;
    username: string | null
} | null> {

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
        const _id: string| null  = decoded.userId
        const username :string | null= decoded.username;
        const email: string | null = decoded.email;
        const profilePicture :string | null = decoded.profilePicture
        // console.log(typeof userId , typeof  username , typeof  token);
        return { username: username, _id: _id , email: email , profilePicture : profilePicture};
    } catch (err) {
        console.log(err)
        return null

    }
}

