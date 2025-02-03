"use server"
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {Stripe} from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
console.log(stripe)
export async function stripePayment(productId: string) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await connectDB()
     const product = await Product.findOne({_id: productId});
    const productPrice = product.productPrice
    const productName = product.productName
    const productDesc = product.productDesc
    try {

        const stripeProduct = await stripe.products.create({
            name: productName,
            description: productDesc,
        })

        const price = await stripe.prices.create({
            unit_amount: productPrice,
            currency: "jpy",
            product: stripeProduct.id
        })


        const session = await stripe.checkout.sessions.create({

            payment_method_types : ["card"],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `http://localhost:3000/payComplete/checkout-succesee?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:3000",
        })
         return  NextResponse.json({checkout_url : session.url})

    } catch (err) {
        console.log(err)
    }
}


