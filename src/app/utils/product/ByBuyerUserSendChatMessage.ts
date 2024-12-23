"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductChatMessage} from "@/models/ProductChatMessage";
import {BuyerProductChatMessage, BuyerProductChatMessageType} from "@/models/ByBuyerProductChatMessage";
import {Product} from "@/models/Product";

const ByListingUserSendChatMessage = async (productId: string | null, currentUser: string | null, chatMessage: string | null) => {
    console.log("ByBuyerUserSendChatMessage", productId, currentUser, chatMessage);
    await connectDB()
    try {
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const ExistChatMessage: BuyerProductChatMessageType | null = await BuyerProductChatMessage.findOne({productId: productId}).select("currentUserId productId")
        console.log(productListingUser)
        if (productListingUser.sellerId == currentUser) {
            console.log("これは出品者の商品なのでlistingUserChatにデータが挿入されます。")
            return null
        }
        console.log(ExistChatMessage?.currentUserId == null && ExistChatMessage?.productId == null)
        if (ExistChatMessage?.currentUserId == null && ExistChatMessage?.productId == null) {
            console.log("kokoにくくｒの")
            const createChatResponse = await BuyerProductChatMessage.create({
                productId: productId,
                currentUserId: currentUser,
                byBuyerChatMessage: chatMessage
            })
            createChatResponse.save()
            return null
        } else {
            const updateChatResponse = await BuyerProductChatMessage.updateOne(
                {_id: ExistChatMessage._id},
                {
                    $push: {
                        byBuyerChatMessage: chatMessage
                    }
                }
            )
            console.log("すでに作成されてるからメッセージだけ、更新しました。" + JSON.stringify(updateChatResponse))
            return null
        }

    } catch (err) {
        console.error(err)
        return null
    }
}

export default ByListingUserSendChatMessage