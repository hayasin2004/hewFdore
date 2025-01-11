"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";
import {Purchase} from "@/models/Purchase";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const savePurchaseProductMessageStatus1 = async (purchaseId: string, pushedUser: string, message: string, currentUserData: string) => {

    await connectDB()

    try {
        console.log("ここに来てるのが成果氏")
        console.log(currentUserData)
        // チャットルーム検索
        // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
        // console.log(fCHatRoomId)

// //     チャットルームにmessageを新しく挿入
    const fChangeMessage = await Purchase.findByIdAndUpdate(
        purchaseId,
        {
            $push: {
                sellerChatMessage: {
                    sellerUserId : currentUserData?._id ,
                    sellerUsername : currentUserData?.username,
                    sellerProfilePicture : currentUserData?.profilePicture,
                    sellerMessage : message,
                    sellerMessageLike : []
                }
            }
        },
        {new: true, useFindAndModify: false}
    )
    console.log(fChangeMessage)
    return {fChangeMessage: JSON.stringify(fChangeMessage)}
    } catch (err) {
        console.log(err)
        return null
    }

}

export default savePurchaseProductMessageStatus1