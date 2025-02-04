"use server"

import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const tradeProductCatchMessageStatus2 = async (purchaseId?: string) => {
    await connectDB()
    try {


        const fChangeMessage = await Purchase.findById({_id: purchaseId}).select("tradeChat")

        const    currentUserChat =  fChangeMessage?.tradeChat[0]?.buyerChatMessage
        const    partnerUserChat =  fChangeMessage?.tradeChat[0]?.sellerChatMessage
        console.log(currentUserChat , partnerUserChat)
        return { buyerChatMessage : JSON.stringify(fChangeMessage?.tradeChat) , partnerUserChat :  JSON.stringify(fChangeMessage?.tradeChat)}
    }catch (err){
        console.log(err)
        return null
    }
}

export default tradeProductCatchMessageStatus2
