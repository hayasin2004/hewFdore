"use server"

import {Chat} from "@/models/Chat";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessageStauts2 = async (chatId: string, pushedUser: string, message: string) => {


    const fChangeMessage = await Chat.findByIdAndUpdate(
        chatId,
        {$push: {partnerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    return {fChangeMessage : fChangeMessage}

}

export default saveMessageStauts2