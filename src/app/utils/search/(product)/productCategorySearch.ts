"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import nodemailer from "nodemailer";

const productCategorySearch = async () => {
    await connectDB()
    try {
        const searchProductCategory = await User.find({productCategoryLikeList: "outer"}).select("username email productCategory");
        console.log(searchProductCategory)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASSWORD,
            }
        })

        //     カテゴリーが追加されたの通知
        for (const user of searchProductCategory) {
            const toUserMailData = {
                from: process.env.GMAILUSER,
                to: "testnodemailermastakahew@gmail.com",
                subject: "お気に入りに追加したテゴリーに新しく商品が追加されました。",
                html: `
                <p>お気に入りに追加したカテゴリー商品の内容</p>
                <p>商品名: ${user}</p>
                <p>価格: ${user}</p>
                <p>商品説明: ${user}</p>
                <p>商品カテゴリー: ${user}</p>
                <p>商品サイズ: ${user}</p>
                <p>商品状態: ${user}</p>
                <p>送料負担者: ${user}</p>
                `
            }
            console.log("送信完了")
            await transporter.sendMail(toUserMailData)
        }


    } catch (err) {
        console.error(err)
        console.log("メールの送信に失敗しました。")
    }
}
export default productCategorySearch