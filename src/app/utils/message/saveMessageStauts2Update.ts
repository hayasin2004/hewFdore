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


    const fChangeMessage = await Chat.findByIdAndUpdate(
        chatId,
        {$push: {partnerUserChat: message}},
        {new: true, useFindAndModify: false}
    )
    const currentUserChat = await fChangeMessage.partnerUserChat

    return {fChangeMessage : {fChangeMessage :fChangeMessage , currentUserChat:currentUserChat }}

}


export default saveMessageStauts2Update