"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";
import {Purchase} from "@/models/Purchase";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const tradeProductCatchMessageStatus1 = async (purchaseId?: string) => {
    console.log(purchaseId)
    // チャットルーム検索
    // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
    // console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
    if (purchaseId !== undefined) {
        const fChangeMessage = await Purchase.findById({_id: purchaseId})
        const chatList = {
            currentUserChat: fChangeMessage.sellerUserChat,
            partnerUserChat: fChangeMessage.buyerUserChat
        }

        console.log(chatList)
        return {chatCatchData : chatList}
    }
}

export default tradeProductCatchMessageStatus1
