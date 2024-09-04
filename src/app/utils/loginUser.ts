"use server"
import {User} from "@/models/User"
import jwt from "jsonwebtoken"
import {connectDB} from "@/lib/mongodb";

export async function loginUser(email: string, password: string) {
       await  connectDB()

    try {

        // mongooseの関数findOneで該当するユーザーを一つ取得してくる
        const user = await User.findOne({email: email})
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
            const check_password = password === user.password
            if (!check_password) {
                console.log("パスワードが違います。" + password)
            } else {
                const userId = user._id
                const username = user.username
                // ログインに成功したユーザーにトークンを発行する
                const token = jwt.sign({
                    userId : user._id.toString(), /*MongoDBからidを取得してきたのでmodels/User.tsには乗ってないです*/
                    username: user.username,
                    email : email,
                }, process.env.SECRET_KEY, {expiresIn: "2 day"})
            return {email, password, token: token , userId : userId.toString() , username : username}
            }

        }
        //     user→クラス , {email , password}　→オブジェクト 、email , password →クラスの中身
    } catch (err) {
        console.log("エラー" + err)
    }
}
