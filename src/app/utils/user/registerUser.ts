"use server"
import {User} from "@/models/User"
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {redirect} from 'next/navigation'
import jwt from "jsonwebtoken";

// ユーザー新規登録
export default async function createUser(username: string, email: string, password: string , PWCheck :string) {
    await connectDB();
    console.log("データベース接続" + await connectDB())
    try {
        if (password !== PWCheck){
            console.log("パスワードと確認用パスワードが一致しません" + password ,PWCheck)
            return null
        }
        console.log([username, email, password])
        const userId = uuidv4()
        const newUser = await User.create({userId, username, email, password})
        await newUser.save()
        const TenMinToken = await jwt.sign({email : newUser?.email}, process.env.SECRET_KEY , {expiresIn: "2 day"})

        return {newUser : JSON.stringify(newUser) ,TenMinToken : JSON.stringify(TenMinToken) }
    } catch (err) {

        console.log("ｓｓｓ" + err)
        //     ユーザーが正常に新規登録できなかったとき
    }

}