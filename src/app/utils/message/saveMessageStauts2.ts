"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessageStauts2 = async (chatId: string, pushedUser: string, message: string) => {
    console.log(chatId, pushedUser, message)
    // チャットルーム検索
    // const fCHatRoomId =await PurchaseChat.findById({_id : chatId})
    // console.log(fCHatRoomId)

//     チャットルームにmessageを新しく挿入
    const fChangeMessage = await Chat.findByIdAndUpdate(
        chatId,
        {$push: {partnerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    console.log(fChangeMessage)
    return {fChangeMessage : fChangeMessage}

}

export default saveMessageStauts2