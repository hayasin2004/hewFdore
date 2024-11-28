"use server"

import {Chat} from "@/models/Chat";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessage = async (data: string, currentUser?: string, detailUser?: string) => {
    console.log(data, currentUser, detailUser)
    try {
        const messageData = await Chat.create({
            currentUserChat: data,
            currentUser: currentUser,
            partnerUser: detailUser
        })
        console.log(messageData)
        return {messageData : JSON.stringify(messageData)}
    } catch (err) {
        console.log(err)
        return null
    }
}
export default saveMessage