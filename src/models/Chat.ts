import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface ChatType {
    currentUser?: UserType;
    partnerUser?: UserType;
    message?: string
    partnerUserMessage?: string
    newChatRoom?: string
}

const ChatSchema = new mongoose.Schema({
    ChatroomId: {
        type: String,
        required: true,
    },
    currentUser: {
        type: String,
        required: true,
    },
    partnerUser: {
        type: String,
        required: true,
    },
    chatMessage: [{
        senderUserId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: "",
        },
        messageLike: {
            type: Array,
            default: []
        },
        timeStamp: {
            type: Date,
            default: Date.now(),
        },
        messageStamp: [{
            messageStampLike: {
                type: String,
                default: "",
            },
            userId: {
                type: String,
                default: ""
            }
        }],
        chatUserRole: {
            type: String,
            default: ""
        }
    }]

})

export const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);