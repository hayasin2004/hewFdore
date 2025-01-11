"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStauts2 = async (purchaseId: string, pushedUser: string, message: string) => {
    console.log(purchaseId, pushedUser, message)
    // チャットルーム検索
    // const fCHatRoomId =await Chat.findById({_id : chatId})
    // console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
    const fChangeMessage = await Chat.findByIdAndUpdate(
        purchaseId,
        {$push: {sellerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    console.log(fChangeMessage)
    return {fChangeMessage : fChangeMessage}

}

export default savePurchaseProductMessageStauts2