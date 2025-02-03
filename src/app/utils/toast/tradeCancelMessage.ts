"use server"
import {connectDB} from "@/lib/mongodb";　
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import nodemailer from "nodemailer";
import {ProductType} from "@/app/utils/product/productDetail";

const tradeCancelMessage = async (purchase: ProductType | null, tradeCode: ProductType | null) => {
    await connectDB()
    try {
        console.log("キャンセル" + purchase, tradeCode)
        const product = await Product.findOne({_id: tradeCode?._id})
        const listingUser = await User.findOne({_id: purchase?.sellerId})
        const buyerUser = await User.findOne({_id: purchase?.buyerId})

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASSWORD,
            },
        });


        const toBuyerUserMailData = {
            from: process.env.GMAILUSER,
            to: "testnodemailermastakahew@gmail.com",
            subject: "取引がキャンセル申請されました。",
            html: ` 
        <p>取引がキャンセル申請されました。</p> 　　
         <p>取引キャンセル申請を運営が許諾次第返金手続きがされます。</p>
         <p>取引商品内容</p>
         <p>出品者ユーザー名 : ${listingUser.username}</p>
         <p>購入者ユーザー名 : ${buyerUser.username}</p>
         <p>商品名: ${product.productName}</p>
         <p>価格: ${product.productPrice}</p>
         <p>商品説明: ${product.productDesc}</p>
         <p>商品カテゴリー: ${product.productCategory}</p>
         <p>商品サイズ: ${product.productSize}</p>
         <p>商品状態: ${product.productCondition}</p>
         <p>送料負担者: ${product.postageBurden}</p>
       
        `,
        };
        const toListingUserMailData = {
            from: process.env.GMAILUSER,
            to: "testnodemailermastakahew@gmail.com",
            subject: "取引がキャンセル申請されました。",
            html: ` 
        <p>取引がキャンセル申請されました。</p> 　　
         <p>取引キャンセル申請を運営が許諾次第返金手続きがされます。</p>
         <p>取引商品内容</p>
         <p>出品者ユーザー名 : ${listingUser.username}</p>
         <p>購入者ユーザー名 : ${buyerUser.username}</p>
         <p>商品名: ${product.productName}</p>
         <p>価格: ${product.productPrice}</p>
         <p>商品説明: ${product.productDesc}</p>
         <p>商品カテゴリー: ${product.productCategory}</p>
         <p>商品サイズ: ${product.productSize}</p>
         <p>商品状態: ${product.productCondition}</p>
         <p>送料負担者: ${product.postageBurden}</p>
       
        `,
        };

        await transporter.sendMail(toBuyerUserMailData);
        await transporter.sendMail(toListingUserMailData);

        return new Response(
            JSON.stringify({status: "Success"}),
            {status: 200, headers: {"Content-Type": "application/json"}}
        );
    } catch (err) {
        console.log(err)
        return null
    }
}

export default tradeCancelMessage