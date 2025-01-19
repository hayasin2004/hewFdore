"use server"

import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {Purchase} from "@/models/Purchase";
import {User} from "@/models/User";

const payComplete = async (productId: string | null, stripeCode: string | null, userId: string | null) => {
    await connectDB()
    try {
        const CheckProduct = await Product.findById({_id: productId})
        const purchaseId = uuidv4();
        console.log("何を得て何を得て大人になっていくんだろう" + productId, stripeCode, userId);
        if (CheckProduct.buyerId !== "" || CheckProduct.stripeCode !== "") {
            const purchase = await Purchase.findOne({productId: productId})
            console.log("既に購入されていていますされています。");
            return JSON.stringify(purchase._id)

        } else {
            console.log("生成" + userId)
            const purchase = await Purchase.create({
                purchaseId: purchaseId,
                sellerId: CheckProduct.sellerId,
                buyerId: userId,
                productId: productId,
            })

            purchase.save()

            const product = await Product.findByIdAndUpdate({_id: productId}, {
                $set: {
                    buyerId: userId,
                    stripeCode: stripeCode,
                    sellStatus: "trading"
                }
            }, {new: true, upsert: true});

            const user = User.findByIdAndUpdate({id: userId}, {
                $set: {
                    purchaseProduct: purchase._id
                }
            },{new : true , upsert: true});

            return JSON.stringify(purchase._id)

        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default payComplete