"use server"
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {Stripe} from "stripe";
import {redirect} from "next/navigation";

const stripePayment = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function stripePaymentFunc(productId: string, paymentMethod: string, userId: string | null) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await connectDB()
    console.log("改変ユーザーID")
    // Mongodbから_idで商品検索
    // console.log(product);　
    //↑のログのコメントアウト解除するとどうやって取ってるのか見れる。
    // ↓見つかったものをここで宣言

    if (paymentMethod === "card") {

        try {
            const product = await Product.findOne({_id: productId});

            const productObjectId = product?._id
            const productPrice = product?.productPrice
            const productName = product?.productName
            const productDesc = product?.productDesc

            if (!product) {
                console.log("Product not found.");
            }
            if (!productName) {
                console.log("Product name is missing.");
            }

            // 製品情報をStripeに追加
            const stripeProduct = await stripe.products.create({
                name: productName,
                description: productDesc,
            })

            const price = await stripe.prices.create({
                unit_amount: productPrice,
                currency: "jpy",
                product: stripeProduct.id
            })

            //     多分ここでMongoの価格が出てくる。

            const session = await stripe.checkout.sessions.create({

                payment_method_types: ["card"],
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    }
                ],
                mode: "payment",
                // req.body.url　→　mongodbのproductIdを付与するのかな？
                success_url: `http://localhost:3000/payComplete/checkout-success?session_id={CHECKOUT_SESSION_ID}&productId=${productId}&userId=${userId}&paymentStatus=stripe`,
                cancel_url: `http://localhost:3000/product/checkout-false?session_id=cancel&productId=${productId}`,
            })
            console.log("こにちは" + session)
            // 303 →　単にサーバーが別の場所にリダイレクトしていることを示すメッセージです。
            return {checkout_url: session.url}

        } catch (err) {
            console.log(err)
        }
    }
}


// try {
//     console.log("ここまでおおけーい")
//
//     NextResponse.redirect(url, statusCode) ,
// } catch (err) {
// }
