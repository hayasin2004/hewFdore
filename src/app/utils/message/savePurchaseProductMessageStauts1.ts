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

const savePurchaseProductMessageStatus1 = async (purchaseId: string, pushedUser: string, message: string) => {
    console.log(purchaseId, pushedUser, message)
    console.log("ここに来てるのが成果氏")

    // チャットルーム検索
    // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
    // console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
    const fChangeMessage = await Purchase.findByIdAndUpdate(
        purchaseId,
        {$push: {sellerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    console.log(fChangeMessage)
    return {fChangeMessage : fChangeMessage}

}

export default savePurchaseProductMessageStatus1