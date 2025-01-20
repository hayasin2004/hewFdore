"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import nodemailer from "nodemailer";

const toastForSeller = async (productId: string | null, sellerId: string | null, buyerId: string | null) => {
    await connectDB()
    const toastProduct = await Product.findById({_id: productId}).select(" productName productPrice productDesc productCategory productSize productCondition postageBurden")
    const toastSellerUser = await User.findById({_id: sellerId}).select("username email")
    const toastBuyerUser = await User.findById({_id: buyerId}).select("username email")
    console.log("toastProduct" + JSON.stringify(toastSellerUser ))

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASSWORD,
            },
        });

        const toSellerUserMailData = {
            from: process.env.GMAILUSER,
            to: "testnodemailermastakahew@gmail.com",
            subject: "商品出品完了のお知らせ",
            html: ` 
        <p>出品した商品が購入されました。</p> 　　
         <p>購入された商品内容</p>
         <p>出品者ユーザー名 : ${toastSellerUser.username}</p>
         <p>購入者ユーザー名 : ${toastBuyerUser.username}</p>
         <p>商品名: ${toastProduct.productName}</p>
         <p>価格: ${toastProduct.productPrice}</p>
         <p>商品説明: ${toastProduct.productDesc}</p>
         <p>商品カテゴリー: ${toastProduct.productCategory}</p>
         <p>商品サイズ: ${toastProduct.productSize}</p>
         <p>商品状態: ${toastProduct.productCondition}</p>
         <p>送料負担者: ${toastProduct.postageBurden}</p>
        `,
        };

        const toBuyerUserMailData = {
            from: process.env.GMAILUSER,
            to: "testnodemailermastakahew@gmail.com",
            subject: "商品出品完了のお知らせ",
            html: ` 
        <p>商品購入完了のお知らせ。</p> 　　
         <p>購入商品内容</p>
         <p>出品者ユーザー名 : ${toastSellerUser.username}</p>
         <p>購入者ユーザー名 : ${toastBuyerUser.username}</p>
         <p>商品名: ${toastProduct.productName}</p>
         <p>価格: ${toastProduct.productPrice}</p>
         <p>商品説明: ${toastProduct.productDesc}</p>
         <p>商品カテゴリー: ${toastProduct.productCategory}</p>
         <p>商品サイズ: ${toastProduct.productSize}</p>
         <p>商品状態: ${toastProduct.productCondition}</p>
         <p>送料負担者: ${toastProduct.postageBurden}</p>
        `,
        };

        try {
            // メールを送信
            // await transporter.sendMail(toHostMailData);
            await transporter.sendMail(toSellerUserMailData);
            await transporter.sendMail(toBuyerUserMailData);

            return new Response(
                JSON.stringify({status: "Success"}),
                {status: 200, headers: {"Content-Type": "application/json"}}
            );
        } catch (error) {
            console.error("メール送信エラー:", error);

            return new Response(
                JSON.stringify({status: "Error", message: "メール送信に失敗しました。"}),
                {status: 500, headers: {"Content-Type": "application/json"}}
            );
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default toastForSeller