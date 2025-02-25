"use server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {Stripe} from "stripe";
import PAYPAY, {QRCodeCreate} from "@paypayopa/paypayopa-sdk-node";
import {v4 as uuidv4} from 'uuid';
import {z} from "zod";


const PayPaySuccessResponse = z.object({
    STATUS: z.literal(201),
    BODY: z.object({
        data: z.object({
            url: z.string(),
        }),
    }),
});

PAYPAY.Configure({
    clientId: process.env.PAYPAY_API_KEY || '',
    clientSecret: process.env.PAYPAY_SECRET || '',
    merchantId: process.env.PAYPAY_MERCHANT_ID || '',
    productionMode: false,
});

export async function stripePaymentPayPay(productId: string, paymentMethod: string, userId: string | undefined) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    await connectDB();
    try {
        const product = await Product.findOne({_id: productId});
        if (!product) {
            throw new Error("Product not found");
        }

        const productPrice = product.productPrice;
        const productName = product.productName;
        const productDesc = product.productDesc;

        const merchantPaymentId = uuidv4();

        const stripeProduct = await stripe.products.create({
            name: productName,
            description: productDesc,
        });

        const price = await stripe.prices.create({
            unit_amount: productPrice,
            currency: "jpy",
            product: stripeProduct.id,
        });

        if (paymentMethod === 'payPay') {
            try {
                const payload = {
                    merchantPaymentId: merchantPaymentId,
                    amount: {
                        amount: productPrice,
                        currency: "JPY",
                    },
                    requestedAt: Math.floor(Date.now() / 1000),
                    orderDescription: productDesc,
                    codeType: 'ORDER_QR',
                    redirectUrl: `http://localhost:3000/payComplete/checkout-success?session_id=${merchantPaymentId}&productId=${productId}&userId=${userId}&paymentStatus=payPay`,
                };
                 const res = await QRCodeCreate(payload);
                const url = PayPaySuccessResponse.parse(res).BODY.data.url;

                  const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price: price.id,
                            quantity: 1,
                        }
                    ],
                    mode: "payment",
                    metadata: {
                        paypay_code_id: merchantPaymentId,
                        paypay_qr_url: url,
                    },
                    success_url: `http://localhost:3000/payComplete/checkout-succesee?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: "http://localhost:3000",
                });
                console.log(session)
                return {url: url};

            } catch (error) {
                console.error("Payment Error:", error);
            }
        }

    } catch (err) {
        console.log(err)
        return null
    }
}
