import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface ProductChatMessageType {
    currentUser?: UserType;
    listingUser?: UserType;
    productId?: string
    ChatMessageUsers?: string
}

const ProductChatMessageSchema = new mongoose.Schema({

    listingUser : {
        type: String,
        required: true,
    },
    productId:{
        type : Array,
        default: [],
        required:true,
    },
    ChatMessageUsers : {
        type : Array ,
        default: [],
        required:true,
    },
    ChatMessage:{
        type : Array ,
        default: [],
        required:true,
    }

})

export const ProductChatMessage = mongoose.models.ProductChatMessage || mongoose.model("ProductChatMessage",ProductChatMessageSchema);