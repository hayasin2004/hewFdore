"use server"

import {Purchase} from "@/models/Purchase";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStatus2Update = async (purchaseId: string, pushedUser: string, message: string) => {
    console.log(purchaseId, pushedUser, message)
    // チャットルーム検索
    // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
    // console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
    const fChangeMessage = await Purchase.findByIdAndUpdate(
        purchaseId,
        {$push: {buyerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    console.log(fChangeMessage)
    return {fChangeMessage : fChangeMessage }

}


export default savePurchaseProductMessageStatus2Update