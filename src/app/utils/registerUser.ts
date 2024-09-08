"use server"
import {User} from "@/models/User"
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {redirect} from 'next/navigation'

// ユーザー新規登録
export default async function createUser(username: string, email: string, password: string) {
        await connectDB();
        console.log("データベース接続" + await connectDB())
    try {
        console.log([username , email  , password])
        const userId = uuidv4()
        const newUser = await User.create({userId, username, email, password})
        await newUser.save()

    } catch (err) {
        console.log("ｓｓｓ"+err)
        //     ユーザーが正常に新規登録できなかったとき
    }
    redirect("/login")

}

