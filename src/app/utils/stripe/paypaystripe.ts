"use server"
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {Stripe} from "stripe";
import {redirect} from "next/navigation";
import PAYPAY, {QRCodeCreate} from "@paypayopa/paypayopa-sdk-node";
import {v4 as uuidv4} from 'uuid';
import {z} from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const PayPaySuccessResponse = z.object({
    STATUS: z.literal(201),
    BODY: z.object({
        data: z.object({
            url: z.string(),
        }),
    }),
})


PAYPAY.Configure({
    clientId: process.env.PAYPAY_API_KEY || '',
    clientSecret: process.env.PAYPAY_SECRET || '',
    merchantId: process.env.PAYPAY_MERCHANT_ID || '',
    productionMode: false,
});

export async function stripePaymentPayPay(productId: string, paymentMethod: string) {
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

    const merchantPaymentId = uuidv4();
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
    const payload = {
        merchantPaymentId: merchantPaymentId,
        amount: {
            amount: productPrice,
            currency: "JPY",
        },
        requestedAt: Math.floor(Date.now() / 1000), // 現在のタイムスタンプ
    };

    const paypayResponse = await PAYPAY.QRCodeCreate(payload);

    // 商品情報の取得などの処理...

    if (paymentMethod === 'paypay') {

        try {
            const payload = {
                merchantPaymentId: merchantPaymentId,
                amount: {
                    amount: productPrice,
                    currency: "JPY",
                },
                requestedAt: Math.floor(Date.now() / 1000), // 現在のタイムスタンプ
                orderDescription: productName,
                codeType: 'ORDER_QR',

            };
            const res = await QRCodeCreate(payload)
            const url = PayPaySuccessResponse.parse(res).BODY.data.url
            return {url: url,}
        } catch (error) {
            console.error("Payment Error:", error);
        }
    }

}

//     多分ここでMongoの価格が出てくる。
// const session = await stripe.checkout.sessions.create({
//
//     payment_method_types : ['card'],
//     line_items: [
//         {
//             price: price.id,
//             quantity: 1,
//         }
//     ],
//     mode: "payment",
//     codeType: 'ORDER_QR',
//     // req.bodu.url　→　mongodbのproductIdを付与するのかな？
//     success_url: `http://localhost:3000/payComplete/checkout-succesee?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: "http://localhost:3000",
//     orderDescription: 'Test Order',
//     redirectType: 'WEB_LINK',
// })
// 303 →　単にサーバーが別の場所にリダイレクトしていることを示すメッセージです。
//    return {checkout_url : session.url , paypay_url : session.redirectUrl}
//
// } catch (err) {
//     console.log(err)
//     return  null
// }
// }


//