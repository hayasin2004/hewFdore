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

export async function loginUser(email: UserType | null, password: UserType | null){
    await connectDB()

    try {

        // mongooseの関数findOneで該当するユーザーを一つ取得してくる
        const user = await User.findOne({email: email}).exec()
        // console.log(user) /*ユーザー情報を取得している。ユーザーが見つからない時はnullが返ってくる。*/
        if (!user) {
            /*emailアドレス検証*/
            console.log({
                message: "ユ―ザーが見つかりませんでした。もう一度メールアドレスを確認の上ログインしてください。",
                status: (404)
            })
        } else {
            // console.log("メールアドレス認証は成功しました。" + user.email)
            //     else文でログインしたユーザーが見つかった時。
            // もしユーザーが見つかった時パスワード認証を行う
            if (password !== user.password) {
                console.log("パスワードが違います。" + password)
            } else {
                const userId: string = user?._id
                const username: string = user?.username
                const email: string = user?.email
                const password: string = user?.password
                const profilePicture: string = user?.profilePicture
                const coverProfilePicture: string = user?.coverProfilePicture
                // ログインに成功したユーザーにトークンを発行する
                const token: UserType = await jwt.sign({
                    userId: user._id.toString(), /*MongoDBからidを取得してきたのでmodels/User.tsには乗ってないです*/
                    username: user.username,
                    email: email,
                    profilePicture: profilePicture,
                }, process.env.SECRET_KEY, {expiresIn: "2 day"})
                return {
                    userData: {
                        email,
                        password,
                        token: token,
                        userId: userId?.toString(),
                        username: username,
                        profilePicture: profilePicture,
                        coverProfilePicture: coverProfilePicture
                    }
                };
            }


        }
        //     user→クラス , {email , password}　→オブジェクト 、email , password →クラスの中身
    } catch (err) {
        console.log("エラー" + err)
    }
}
