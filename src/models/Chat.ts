import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({

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