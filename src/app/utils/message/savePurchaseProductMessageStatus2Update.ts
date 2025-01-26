"use server"

import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStatus2Update = async (purchaseId: string, pushedUser: string, message: string ,currentUserData) => {
    //console.log(purchaseId, pushedUser, message)
    await connectDB()

    try {
        // チャットルーム検索
        // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
        // //console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
        const fChangeMessage = await Purchase.findByIdAndUpdate(
            purchaseId,
            {
                $push: {
                    buyerChatMessage: {
                        buyerUserId : currentUserData?._id ,
                        buyerUsername : currentUserData?.username,
                        buyerProfilePicture : currentUserData?.profilePicture,
                        buyerMessage: message,
                        buyerMessageLike: []
                    }
                }
            },
            {new: true, useFindAndModify: false}
        )
        //console.log(fChangeMessage)
        return {fChangeMessage: JSON.stringify(fChangeMessage)}


    } catch (err) {
        //console.log(err)
        return null
    }
}


export default savePurchaseProductMessageStatus2Update
