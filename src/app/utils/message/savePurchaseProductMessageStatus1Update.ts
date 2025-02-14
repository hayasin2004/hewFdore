"use server"

import {Purchase} from "@/models/Purchase";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStatus2Update = async (purchaseId: string, pushedUser: string, message: string) => {

    const fChangeMessage = await Purchase.findByIdAndUpdate(
        purchaseId,
        {$push: {buyerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    return {fChangeMessage : fChangeMessage }

}


export default savePurchaseProductMessageStatus2Update