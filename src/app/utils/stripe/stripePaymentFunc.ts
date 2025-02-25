"use server"
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {Stripe} from "stripe";

const stripePayment = new Stripe(process.env.STRIPE_SECRET_KEY!);
console.log(stripePayment)
export async function stripePaymentFunc(productId: string, paymentMethod: string, userId: string | undefined) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    await connectDB()

    if (paymentMethod === "card") {

        try {
            const product = await Product.findOne({_id: productId});

            const productPrice = product?.productPrice
            const productName = product?.productName
            const productDesc = product?.productDesc

            if (!product) {
                console.log("Product not found.");
                return  null
            }
            if (!productName) {
                console.log("Product name is missing.");
                return  null

            }
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
             return {checkout_url: session.url}

        } catch (err) {
            console.log(err)
        }
    }
}

