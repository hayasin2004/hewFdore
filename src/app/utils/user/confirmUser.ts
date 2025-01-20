"use server"
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/mongodb";
import {string} from "prop-types";
import {UserType} from "@/app/api/user/catchUser/route";
import {User} from "@/models/User";

// export interface User {
//     token? :string;
//     username?: string;
//     email? : string;
//     _id?: string | null;
//     profilePicture? :string;
// }

export default async function confirmUser(token?: string):Promise< string  | null>  {

    await connectDB()
    console.log("うすいけんた")
    if (!token) {
        return null;

    }
    try {
        const decoded : string | null = await jwt.verify(token, process.env.SECRET_KEY);
        const userData = await User.findById(decoded?.userId)
        console.log("_id"+decoded?.userId)
        return JSON.stringify(userData);
        // decodedの中身（例）テスト{
        //   userId: '66d4f569d06498d8d6dd5539',
        //   username: 'テスト',
        // const _id : string  = decoded?.userId
        // const username: string = decoded?.username;
        // const email: string  = decoded?.email;
        // const profilePicture: string  = decoded?.profilePicture
        // console.log(typeof userId , typeof  username , typeof  token);
    } catch (err) {
        console.log(err)
        return null

    }
}

