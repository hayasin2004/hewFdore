"use server"

import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {Purchase} from "@/models/Purchase";
import {User} from "@/models/User";
import toastGmailForPurchase from "@/app/utils/product/toastGmailForPurchase";
import toastPurchase from "@/app/utils/toast/toastPurchase";

const payComplete = async (productId: string | null, stripeCode: string | null, userId: string | null, paymentStatus: string | null) => {
    await connectDB()
    try {
        console.log("productId"+productId , "stripeCode"+stripeCode , "userId" + userId, "paymentStatus" + paymentStatus)
        const CheckProduct = await Product.findById({_id: productId})
         const purchaseId = uuidv4();
         if (CheckProduct.buyerId !== "" || CheckProduct.stripeCode !== "") {
            const purchase = await Purchase.findOne({productId: productId})
             return JSON.stringify(purchase._id)

        } else {
             const purchase = await Purchase.create({
                purchaseId: purchaseId,
                sellerId: CheckProduct.sellerId,
                buyerId: userId,
                productId: productId,
                tradeStatus: "取引中"
            })

            purchase.save()

            await toastPurchase(userId,productId,purchase._id)
            if (paymentStatus == "stripe") {
                const product = await Product.findByIdAndUpdate({_id: productId}, {
                    $set: {
                        buyerId: userId,
                        stripeCode: stripeCode,
                        sellStatus: "取引中"
                    }
                }, {new: true, upsert: true});
                console.log(product)
            }
            else if (paymentStatus == "payPay") {
                const product = await Product.findByIdAndUpdate({_id: productId}, {
                    $set: {
                        buyerId: userId,
                        payPayCode: stripeCode,
                        sellStatus: "取引中"
                    }
                }, {new: true, upsert: true});
                console.log(product)
            }
            const user = User.findByIdAndUpdate({id: userId}, {
                $set: {
                    purchaseProduct: purchase?._id
                }
            }, {new: true, upsert: true});
            const sendPurchaseComplete = await toastGmailForPurchase(productId, CheckProduct.sellerId, userId)
             console.log(user , sendPurchaseComplete)
             return JSON.stringify(purchase._id)
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default payComplete