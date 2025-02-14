"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessageStauts1 = async (chatId: string, pushedUser: string, message: string) => {

    await connectDB()

    try {

        //console.log("asagayasimai"+chatId, pushedUser, message)
        // チャットルーム検索
        // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
        // //console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
        console.log("chatIDDDDDDDDDDDDD" + chatId , pushedUser , message)

        const sendUserData = await  User.findById(pushedUser)

        const fChangeMessage = await Chat.findByIdAndUpdate(
            chatId,
            {$push: {chatMessage : [{
                        senderUserId : pushedUser,
                        username : sendUserData.username,
                        profilePicture : sendUserData.profilePicture,
                        message : message,
                        chatUserRole : "チャットルーム制作者"
                    }]}},
            {new: true, useFindAndModify: false}
        )
        //console.log(fChangeMessage)
        return {fChangeMessage: JSON.stringify(fChangeMessage)}

    } catch (err) {
        //console.log(err)
        return null
    }
}

export default saveMessageStauts1
