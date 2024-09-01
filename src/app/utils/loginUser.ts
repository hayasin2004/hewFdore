"use server"
import {User} from "@/models/User"
import {connectDB} from "@/lib/mongodb";

export async function loginUser(email: string, password: string) {
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
            console.log("メールアドレス認証は成功しました。" + user)
            //     else文でログインしたユーザーが見つかった時。
            // もしユーザーが見つかった時パスワード認証を行う
            const check_password = password === user.password
            const pic = user.profilePicture
            const picture = pic;
            if (!check_password) {
                console.log("パスワードが違います。")
            }
            return {email, password, pic: picture.pic}
        }
        //     user→クラス , {email , password}　→オブジェクト 、email , password →クラスの中身
    } catch (err) {
        console.log(err)
    }
}
