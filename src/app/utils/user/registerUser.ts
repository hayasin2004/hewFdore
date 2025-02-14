"use server"
import {User} from "@/models/User"
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import jwt from "jsonwebtoken";
import {UserType} from "@/app/api/user/catchUser/route";

export default async function createUser(username: string, email: string, password: string, PWCheck: string):Promise<{status : string} |{newUser  :string | null }|{TenMinToken : string } |null> {
    await connectDB();
    try {
        const checkUserName: UserType | null = await User.findOne({username: username});
        if (checkUserName) {
            return {status: "existUsername"}
        }
        if (password !== PWCheck) {
            return null
        }
        const userId: string = uuidv4()
        const newUser = await User.create({userId, username, email, password})
        const user: string = await newUser.save()
        const TenMinToken: string = await jwt.sign({email: newUser?.email}, process.env.SECRET_KEY, {expiresIn: "2 day"})
        return {newUser: JSON.stringify(user), TenMinToken: JSON.stringify(TenMinToken)}


    } catch (err) {

        console.log("ｓｓｓ" + err)
        return null
    }

}