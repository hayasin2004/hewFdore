"use server"

import {Chat} from "@/models/Chat";

const catchMessageStatus1Status2 = async (chatId?: string) => {

    if (chatId !== undefined) {
        const fChangeMessage = await Chat.findById({_id: chatId})
        const chatList = {
            currentChat: fChangeMessage.currentUserChat,
            partnerUserChat : fChangeMessage.partnerUserChat
        }

        return {chatCatchData : chatList}
    }
}

export default catchMessageStatus1Status2
