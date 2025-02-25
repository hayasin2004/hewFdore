"use server"
import {User} from "@/models/User"
import jwt from "jsonwebtoken"
import {connectDB} from "@/lib/mongodb";

interface User {
    userId: string
    username: string
    password: string
    email: string
    profilePicture: string
    coverProfilePicture: string
}

export async function loginUser(email: string | null, password: string | null, confirmPassword: string | null) {
    await connectDB()
    if (password !== confirmPassword) {

         return null
    }
    try {
         const user = await User.findOne({email: email}).exec()
         if (!user) {
            /*emailアドレス検証*/
            console.log({
                message: "ユ―ザーが見つかりませんでした。もう一度メールアドレスを確認の上ログインしてください。",
                status: (404)
            })
             return  null
        } else {
             if (password !== user.password) {
             } else {
                const userId: string | null = user?._id
                const username: string | null = user?.username
                const email: string | null = user?.email
                const password: string | null = user?.password
                const profilePicture: string | null = user?.profilePicture
                const coverProfilePicture: string | null = user?.coverProfilePicture


                const token: string | null = await jwt.sign({
                    userId: userId, /*MongoDBからidを取得してきたのでmodels/User.tsには乗ってないです*/
                }, process.env.SECRET_KEY!, {expiresIn: "2 day"})


                return {
                    email,
                    password,
                    token: token,
                    userId: userId,
                    username: username,
                    profilePicture: profilePicture,
                    coverProfilePicture: coverProfilePicture

                };
            }
        }
          } catch (err) {
        console.log("エラー" + err)
        return  null
    }
}
