"use server"

import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStatus2Update = async (purchaseId: string, message: string, currentUserData: UserType | undefined) => {

    await connectDB()

    try {

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
