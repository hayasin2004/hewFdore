"use server"

import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStauts2 = async (purchaseId: string, pushedUser: string, message: string) => {

    await connectDB()
    try {
        // チャットルーム検索
        // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
        // console.log(fCHatRoomId)

        console.log(message)

//     チャットルームにmessageを新しく挿入
        const fChangeMessage = await Purchase.findByIdAndUpdate(
            purchaseId,
            {$push: {buyerUserChat: message}},
            {new: true, useFindAndModify: false}
        )
        console.log(fChangeMessage)
        return {fChangeMessage: fChangeMessage}

    } catch (err) {
        console.log(err)
        return null
    }
}

export default savePurchaseProductMessageStauts2
