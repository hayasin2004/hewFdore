"use server"

import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";

const payComplete = async (productId: string | null, stripeCode: string | null, userId: string | null) => {
    await connectDB()
    try {
        console.log(productId, stripeCode, userId);
        const CheckProduct = await Product.findById({_id: productId})
        if (CheckProduct.buyerId !== "" || CheckProduct.stripeCode !== "") {
            console.log("既に購入されていていますされています。");
            return null
        } else {

            const product = await Product.findByIdAndUpdate({_id: productId}, {
                $set: {
                    buyerId: userId,
                    stripeCode: stripeCode
                }
            }, {new: true, upsert: true});

            return {product: JSON.stringify(product)}
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default payComplete