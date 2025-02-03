"use server"
import {User} from "@/models/User"
import jwt from "jsonwebtoken"
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";

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
    //console.log("loginUser", email, password)
    if (password !== confirmPassword) {
        //console.log("パスワードと確認用パスワードが違います。" + password , confirmPassword)
        return null
    }
    try {
        // mongooseの関数findOneで該当するユーザーを一つ取得してくる
        const user = await User.findOne({email: email}).exec()
        // //console.log(user) /*ユーザー情報を取得している。ユーザーが見つからない時はnullが返ってくる。*/
        if (!user) {
            /*emailアドレス検証*/
            console.log({
                message: "ユ―ザーが見つかりませんでした。もう一度メールアドレスを確認の上ログインしてください。",
                status: (404)
            })
        } else {
            // //console.log("メールアドレス認証は成功しました。" + user.email)
            //     else文でログインしたユーザーが見つかった時。
            // もしユーザーが見つかった時パスワード認証を行う
            if (password !== user.password) {
                //console.log("パスワードが違います。" + password)
            } else {
                const userId: string | null = user?._id
                const username: string | null = user?.username
                const email: string | null = user?.email
                const password: string | null = user?.password
                const profilePicture: string | null = user?.profilePicture
                const coverProfilePicture: string | null = user?.coverProfilePicture
                // ログインに成功したユーザーにトークンを発行する


                const token: string | null = await jwt.sign({
                    userId: userId, /*MongoDBからidを取得してきたのでmodels/User.tsには乗ってないです*/
                }, process.env.SECRET_KEY, {expiresIn: "2 day"})


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
        //     user→クラス , {email , password}　→オブジェクト 、email , password →クラスの中身
    } catch (err) {
        //console.log("エラー" + err)
    }
}
