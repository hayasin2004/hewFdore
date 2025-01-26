"use server"

import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from 'uuid';
import {Purchase} from "@/models/Purchase";
import {User} from "@/models/User";
import toastGmailForPurchase from "@/app/utils/product/toastGmailForPurchase";

const payComplete = async (productId: string | null, stripeCode: string | null, userId: string | null, paymentStatus: string | null) => {
    await connectDB()
    try {
        const CheckProduct = await Product.findById({_id: productId})
        //console.log("何を得て何を得て大人になっていくんだろう" + CheckProduct)
        const purchaseId = uuidv4();
        //console.log(productId, stripeCode, userId);
        if (CheckProduct.buyerId !== "" || CheckProduct.stripeCode !== "") {
            const purchase = await Purchase.findOne({productId: productId})
            //console.log("既に購入されていていますされています。");
            return JSON.stringify(purchase._id)

        } else {
            //console.log("生成" + userId)
            const purchase = await Purchase.create({
                purchaseId: purchaseId,
                sellerId: CheckProduct.sellerId,
                buyerId: userId,
                productId: productId,
                tradeStatus: "取引中"
            })

            purchase.save()
            if (paymentStatus == "stripe") {

                const product = await Product.findByIdAndUpdate({_id: productId}, {
                    $set: {
                        buyerId: userId,
                        stripeCode: stripeCode,
                        sellStatus: "trading"
                    }
                }, {new: true, upsert: true});
            }
            else if (paymentStatus == "payPay") {

                const product = await Product.findByIdAndUpdate({_id: productId}, {
                    $set: {
                        buyerId: userId,
                        payPayCode: stripeCode,
                        sellStatus: "trading"
                    }
                }, {new: true, upsert: true});
            }

            const user = User.findByIdAndUpdate({id: userId}, {
                $set: {
                    purchaseProduct: purchase?._id
                }
            }, {new: true, upsert: true});

            const sendPurchaseComplete = await toastGmailForPurchase(productId, CheckProduct.sellerId, userId)
            //console.log(sendPurchaseComplete)
            return JSON.stringify(purchase._id)

        }
    } catch (err) {
        //console.log(err)
        return null
    }
}

export default payComplete