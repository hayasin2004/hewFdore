"use server"

import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {Purchase} from "@/models/Purchase";

const payComplete = async (productId: string | null, stripeCode: string | null, userId: string | null) => {
    await connectDB()
    try {
        const CheckProduct = await Product.findById({_id: productId})
        const purchaseId = uuidv4();
        const purchase = await Purchase.create({
            purchaseId: purchaseId,
            sellerId: CheckProduct.sellerId,
            buyerId: userId
        })

        purchase.save()

        console.log(productId, stripeCode, userId);
        if (CheckProduct.buyerId !== "" || CheckProduct.stripeCode !== "") {
            console.log("既に購入されていていますされています。");
            return JSON.stringify(purchase._id)

        } else {

            const product = await Product.findByIdAndUpdate({_id: productId}, {
                $set: {
                    buyerId: userId,
                    stripeCode: stripeCode
                }
            }, {new: true, upsert: true});
            return JSON.stringify(purchase._id)

        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default payComplete