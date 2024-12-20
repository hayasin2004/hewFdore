"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductChatMessage} from "@/models/ProductChatMessage";
import {BuyerProductChatMessage} from "@/models/ByBuyerProductChatMessage";

const ByListingUserSendChatMessage = async (chatRoomId: string | null, currentUser: string | null, chatMessage: string | null) => {
    console.log("ByListingUserSendChatMessage", chatRoomId, currentUser, chatMessage);
    await connectDB()
    try {
        const ChatRoom = await ProductChatMessage.findOne({_id: chatRoomId})
        const ExistChatMessage: string | null = await BuyerProductChatMessage.findOne({currentUserId: currentUser})
        console.log(ExistChatMessage)
        if (ChatRoom.listingUser == currentUser) {
            console.log("これは出品者の商品なのでlistingUserChatにデータが挿入されます。")
            return null
        }
        // console.log(ExistChatMessage == currentUser)
        if (ExistChatMessage == null) {
            console.log("kokoにくくｒの")

            const createChatResponse = await BuyerProductChatMessage.create({
                productId: ChatRoom.productId,
                currentUserId: currentUser,
                byBuyerChatMessage: chatMessage

            })
            createChatResponse.save()
            return null
        } else {
            const updateChatResponse = await BuyerProductChatMessage.updateOne(
                {
                    currentUserId: currentUser
                }, {
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