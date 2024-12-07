"use server"
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(productId : string, res: NextResponse) {
        await connectDB()

        console.log("見つけてた" );
        const product = await Product.findOne({ _id: productId });

        // try {
        //         console.log("ここまでおおけーい")
        //     const session = stripe.checkout.sessions.create({
        //         //     多分ここでMongoの価格が出てくる。
        //         line_items: [
        //             {
        //                 price: "",
        //                 quantity: 1,
        //             }
        //         ],
        //         mode: "payment",
        //         // req.bodu.url　→　mongodbのproductIdを付与するのかな？
        //         success_url: `${productId}/?success=true`,
        //         cancel_url: `${productId}/success=false`
        //     })
        //     // NextResponse.redirect(url, statusCode) ,
        //     // 303 →　単にサーバーが別の場所にリダイレクトしていることを示すメッセージです。
        //     NextResponse.redirect(session.url, 303)
        // } catch (err) {
        //     console.log("Stripe側のエラー" + err);
        // }




}