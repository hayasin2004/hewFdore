"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessageStauts2Update = async (chatId: string, pushedUser: string, message: string) => {
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
    const currentUserChat = await fChangeMessage.partnerUserChat
    console.log(fChangeMessage)
    return {fChangeMessage : {fChangeMessage :fChangeMessage , currentUserChat:currentUserChat }}

}


export default saveMessageStauts2Update