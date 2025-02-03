"use server"

import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const tradeProductCatchMessageStatus1 = async (purchaseId?: string) => {

    await connectDB()
    try {


        if (purchaseId !== undefined) {
            const fChangeMessage = await Purchase.findOne({_id: purchaseId}).select("tradeChat timeStamp").sort({timeStamp: 1})
            const currentUserChat = fChangeMessage?.tradeChat.sellerChatMessage

            const partnerUserChat = fChangeMessage?.tradeChat.buyerChatMessage
            console.log(fChangeMessage?.tradeChat[1]?.buyerChatMessage)
            return {
                currentUserChat: JSON.stringify(fChangeMessage?.tradeChat),
                partnerUserChat: JSON.stringify(fChangeMessage?.tradeChat)
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default tradeProductCatchMessageStatus1
