"use server"

import {Chat} from "@/models/Chat";

const catchMessageStatus3 = async (chatId?: string) => {

    if (chatId !== undefined) {
        const fChangeMessage = await Chat.findById({_id: chatId})
        const chatList = {
            currentChat: fChangeMessage.partnerUserChat,
            partnerUserChat : fChangeMessage.currentUserChat
        }

        return {chatCatchData : chatList}
    }
}

export default catchMessageStatus3
