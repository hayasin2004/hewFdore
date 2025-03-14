"use server"

import {Chat} from "@/models/Chat";
import {connectDB} from "@/lib/mongodb";

export interface ChatType {
    currentUser?: string
    partnerUser?: string
    currentChat?: string[]
    partnerUserChat?: string[]
}

const saveMessageStauts1Update = async (chatId: string, pushedUser: string, message: string) => {
    await connectDB()
    try {


        const fChangeMessage = await Chat.findByIdAndUpdate(
            chatId,
            {$push: {currentUserChat: message}},
            {new: true, useFindAndModify: false}
        )
        return {fChangeMessage: fChangeMessage}

    } catch (err) {
        console.log(err)
        return null
    }
}

export default saveMessageStauts1Update
