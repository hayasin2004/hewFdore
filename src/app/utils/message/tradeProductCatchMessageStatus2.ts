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

const tradeProductCatchMessageStatus2 = async (purchaseId?: string) => {
    console.log(purchaseId)
    await connectDB()
    try {

    // チャットルーム検索
    // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
    // console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
        const fChangeMessage = await Purchase.findById({_id: purchaseId})
        console.log("staff支店"+fChangeMessage?.buyerChatMessage)
        const    currentUserChat =  fChangeMessage?.buyerChatMessage
        const    partnerUserChat =  fChangeMessage?.sellerChatMessage
        return {currentUserChat : JSON.stringify(currentUserChat) ,partnerUserChat : JSON.stringify(partnerUserChat) }
    }catch (err){
        console.log(err)
        return null
    }
}

export default tradeProductCatchMessageStatus2
