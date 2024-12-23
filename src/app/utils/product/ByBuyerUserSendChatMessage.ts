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
        const ExistChatMessage: BuyerProductChatMessageType | null = await BuyerProductChatMessage.find().select("_id listingUserId buyerUserId productId")
        console.log(productListingUser)
        // 出品者だった場合の処理。
        if (productListingUser.sellerId == currentUser) {
            if (ExistChatMessage?.listingUserId !== currentUser && ExistChatMessage?.productId == productId) {
                const createChatResponse = await BuyerProductChatMessage.create({
                    productId: productId,
                    listingUserId:productListingUser.sellerId,
                    listingChatMessage: chatMessage
                })
                console.log("これは出品者の商品なのでlistingUserChatにデータが挿入されます。")
                createChatResponse.save()
                return null
            } else {
                const updateChatResponse = await BuyerProductChatMessage.updateMany(
                    {
                        $push: {
                            listingChatMessage: chatMessage
                        }
                    }
                )
                console.log("出品者のコメント" + JSON.stringify(updateChatResponse))
                return null
            }

        }

        // 出品者ではなく閲覧者の場合の処理。
        console.log(ExistChatMessage?.buyerUserId !== currentUser)
        if (ExistChatMessage?.buyerUserId !== currentUser &&  ExistChatMessage?.productId == productId) {
            const createChatResponse = await BuyerProductChatMessage.create({
                listingUserId:productListingUser.sellerId,
                buyerUserId: currentUser,
                productId: productId,
                buyerChatMessage: chatMessage
            })
            createChatResponse.save()
            return null
        } else {
            const updateChatResponse = await BuyerProductChatMessage.updateOne(
                {_id: ExistChatMessage._id},
                {
                    $push: {
                        buyerChatMessage: chatMessage
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