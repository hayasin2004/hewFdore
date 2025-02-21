"use server"

import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStatus2Update = async (purchaseId: string, pushedUser: string, message: string, currentUserData: string) => {

    await connectDB()

    try {
        console.log(purchaseId ,currentUserData._id , message)

        const fCHatRoomId = await Purchase.findById({_id: purchaseId})
        console.log(fCHatRoomId)
        const fChangeMessage = await Purchase.findByIdAndUpdate(
            {_id:purchaseId},
            {
                $push: {
                    tradeChat: [{
                        buyerChatMessage: [{
                            buyerUserId: currentUserData?._id,
                            buyerUsername: currentUserData?.username,
                            buyerProfilePicture: currentUserData?.profilePicture,
                            buyerMessage: message,
                            buyerMessageLike: []
                        }],
                        chatUserRole: "購入者",
                    }]
                }
            },
            {new: true, useFindAndModify: false}
        )
        console.log("これ")
        return {fChangeMessage: JSON.stringify(fChangeMessage)}


    } catch (err) {
        console.log(err)
        return null
    }
}


export default savePurchaseProductMessageStatus2Update
