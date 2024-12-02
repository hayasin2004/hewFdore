"use server"

import {Chat} from "@/models/Chat";
import {string} from "prop-types";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessage = async (chatId: string, pushedUser : string,message: string) => {
    console.log(chatId, pushedUser, message)
    // チャットルーム検索
    // const fCHatRoomId =await Chat.findById({_id : chatId})
    // console.log(fCHatRoomId)
}

export default saveMessage