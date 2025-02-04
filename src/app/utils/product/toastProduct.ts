"use server"
import nodemailer from "nodemailer";
import {Product} from "@/models/Product";

const toastProduct = async (productId: string, sellerId: string) => {
    const toastProduct = await Product.findById({_id: productId}).select(" productName productPrice productDesc productCategory productSize productCondition postageBurden")

    console.log(sellerId)
    {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASSWORD,
            },
        });


        const toUserMailData = {
            from: process.env.GMAILUSER,
            to: "testnodemailermastakahew@gmail.com",
            subject: "商品出品完了のお知らせ",
            html: ` 
        <p>出品が完了しました。</p> 　　
         <p>出品内容</p>
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
            await transporter.sendMail(toUserMailData);

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
    }
}

export default toastProduct;
