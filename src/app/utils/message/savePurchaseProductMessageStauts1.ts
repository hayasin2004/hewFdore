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

const savePurchaseProductMessageStatus1 = async (purchaseId: string, pushedUser: string | undefined, message: string, currentUserData: UserType | undefined) => {

    await connectDB()

    try {

        const fChangeMessage = await Purchase.findByIdAndUpdate(
            purchaseId,
            {
                $push: {
                    tradeChat: [{
                        sellerChatMessage: {
                            sellerUserId: currentUserData?._id,
                            sellerUsername: currentUserData?.username,
                            sellerProfilePicture: currentUserData?.profilePicture,
                            sellerMessage: message,
                            sellerMessageLike: []
                        },
                        chatUserRole: "出品者",
                    }]
                }
            },
            {new: true, useFindAndModify: false}
        )
        return {fChangeMessage: JSON.stringify(fChangeMessage)}
    } catch (err) {
        console.log(err)
        return null
    }

}

export default savePurchaseProductMessageStatus1