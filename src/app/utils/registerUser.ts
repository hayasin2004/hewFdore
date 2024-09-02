"use server"
import {User} from "@/models/User"
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {redirect} from 'next/navigation'

// ユーザー新規登録
export default async function createUser(username: string, email: string, password: string) {
    try {
        const userId = uuidv4()
        await connectDB();
        const newUser = await User.create({userId, username, email, password})
        await newUser.save()

    } catch (err) {
        console.log(err)
        //     ユーザーが正常に新規登録できなかったとき
    }
    redirect("/login")

}

