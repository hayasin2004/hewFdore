"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {string} from "prop-types";
import {UserType} from "@/app/api/user/catchUser/route";

// export interface User {
//     token? :string;
//     username?: string;
//     email? : string;
//     _id?: string | null;
//     profilePicture? :string;
// }

export default async function confirmUser(token?: string){

    await connectDB()
    console.log("うすいけんた")
    if (!token) {
        return null;

    }
    try {
        const decoded : UserType | null = await jwt.verify(token, process.env.SECRET_KEY);
        // decodedの中身（例）テスト{
        //   userId: '66d4f569d06498d8d6dd5539',
        //   username: 'テスト',
        const _id  = decoded?.userId
        const username= decoded?.username;
        const email = decoded?.email;
        const profilePicture = decoded?.profilePicture
        // console.log(typeof userId , typeof  username , typeof  token);
        return { username: username, _id: _id , email: email , profilePicture : profilePicture};
    } catch (err) {
        console.log(err)
        return null

    }
}

