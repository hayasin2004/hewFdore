"use server"
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {Stripe} from "stripe";
import {string} from "prop-types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

export async function stripePayment(productId: string) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await connectDB()
    // Mongodbから_idで商品検索
    const product = await Product.findOne({_id: productId});
    // console.log(product);　
    //↑のログのコメントアウト解除するとどうやって取ってるのか見れる。
    // ↓見つかったものをここで宣言
    const productObjectId = product._id
    const productPrice = product.productPrice
    const productName = product.productName
    const productDesc = product.productDesc

    try {

        // 製品情報をStripeに追加
        const stripeProduct = await stripe.products.create({
            name: productName,
            description: productDesc,
        })

        const price = await stripe.prices.create({
            unit_amount: productPrice,
            currency: "usd",
            product: stripeProduct.id
        })

        //     多分ここでMongoの価格が出てくる。
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                }
            ],
            mode: "payment",
            // req.bodu.url　→　mongodbのproductIdを付与するのかな？
            success_url: `http://localhost:3000/payComplete/${productId}/?success=true`,
            cancel_url: `http://localhost:3000/payComplete/${productId}/?success=false`
        })
        console.log(session.success_url)
        const  url = JSON.stringify(session.success_url);
        return NextResponse.redirect(url)

    } catch (err) {
        console.log(err)
    }
}


// try {
//     console.log("ここまでおおけーい")
//
//     NextResponse.redirect(url, statusCode) ,
//     303 →　単にサーバーが別の場所にリダイレクトしていることを示すメッセージです。
//     NextResponse.redirect(session.url, 303)
// } catch (err) {
// }
