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

        const fChangeMessage = await Purchase.findByIdAndUpdate(
            purchaseId,
            {$push: {buyerUserChat: message}},
            {new: true, useFindAndModify: false}
        )
        return {fChangeMessage: fChangeMessage}

    } catch (err) {
        console.log(err)
        return null
    }
}

export default savePurchaseProductMessageStauts2
