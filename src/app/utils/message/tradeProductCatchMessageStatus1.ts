"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";
import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const tradeProductCatchMessageStatus1 = async (purchaseId?: string) => {
    //console.log(purchaseId)
    await connectDB()
    try {
        // チャットルーム検索
        // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
        // //console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
        if (purchaseId !== undefined) {
            const fChangeMessage = await Purchase.findOne({_id: purchaseId}).select("tradeChat timeStamp").sort({timeStamp: 1})
            const currentUserChat = fChangeMessage?.tradeChat.sellerChatMessage
            //console.log("どのような形式？" + fChangeMessage)
            const partnerUserChat = fChangeMessage?.tradeChat.buyerChatMessage
            console.log(fChangeMessage.tradeChat[0]?.sellerChatMessage)
            return {
                currentUserChat: JSON.stringify(fChangeMessage?.tradeChat[0]?.sellerChatMessage),
                partnerUserChat: JSON.stringify(fChangeMessage?.tradeChat[0]?.buyerChatMessage)
            }
        }
    } catch (err) {
        //console.log(err)
        return null
    }
}

export default tradeProductCatchMessageStatus1
