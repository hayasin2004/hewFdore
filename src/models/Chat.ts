import mongoose from "mongoose";

export interface ChatType {
    currentUser?: string;
    partnerUser?: string
    message?: string
    partnerUserMessage?: string
    newChatRoom? : string
}

const ChatSchema = new mongoose.Schema({
    ChatroomId : {
        type: String,
        required: true,
    },
    currentUser : {
        type: String,
        required: true,
    },
    partnerUser : {
        type: String,
        required: true,
    },
    currentUserChat :{
        type : Array,
        default: [],
    },
    partnerUserChat : {
        type : Array ,
        default: [],
    }

})

export const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);