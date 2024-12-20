"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductChatMessage} from "@/models/ProductChatMessage";
import {ByBuyerProductChatMessage} from "@/models/ByBuyerProductChatMessage";

const ByListingUserSendChatMessage = async (chatRoomId : string | null, currentUser : string | null , chatMessage : string | null) => {
    console.log("ByListingUserSendChatMessage", chatRoomId , currentUser,chatMessage);
    await connectDB()
    try {
        const ChatRoom = await  ProductChatMessage.findOne({_id : chatRoomId})
        if (ChatRoom.listingUser == currentUser) {
            console.log("これは出品者の商品なのでlistingUserChatにデータが挿入されます。")
            return null
        }
        const NewProductChatMessageSession = await ByBuyerProductChatMessage.updateOne({ChatMessageUsers:currentUserId , productId:productId ,listingUser:product?.sellerId})

        console.log(ChatRoom)
    }catch (err){
        console.error(err)
        return null
    }
}

export default ByListingUserSendChatMessage