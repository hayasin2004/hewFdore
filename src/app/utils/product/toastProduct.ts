"use server"
//NodeMailer
import nodemailer from "nodemailer";
import productDetail from "@/app/utils/product/productDetail";
import userProfile from "@/app/utils/user/userProfile";
import {User} from "@/models/User";
import {Stripe} from "stripe";
import {Product} from "@/models/Product";

const toastProduct = async (productId: string, sellerId: string) => {
    const toastProduct = await Product.findById({_id: productId}).select(" productName productPrice productDesc productCategory productSize productCondition postageBurden")
    const toastUser = await User.findById({_id: sellerId}).select("username email")
    console.log("toastProduct" + JSON.stringify(toastUser))
    {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASSWORD,
            },
        });

        // Email to admin
        // const toHostMailData = {
        //     from: process.env.GMAILUSER,
        //     to: "masataka1kousuke1@gmail.com.com", //後で変える
        //     subject: " `[お問い合わせ]${body.name}様より`",
        //     text: "${body.message} Send from ${body.email}",
        //     html: `
        // <p>【お名前】</p>
        // <p>【メッセージ内容】</p>
        // <p>【メールアドレス】</p>
        // <p>【確認コード】</p>
        // `,
        // };

        // Email to user
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
            // メールを送信
            // await transporter.sendMail(toHostMailData);
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
