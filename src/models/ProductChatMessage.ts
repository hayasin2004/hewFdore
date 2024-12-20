import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface ProductChatMessageType {
    _id: string;
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
        type: String,
        required:true,
    },
    ChatMessageUsers : {
        type : Array ,
        default: [],
        required:true,
    },
    otherUser:{
        type : Array ,
        default: [],
        required:true,
    },
    ListingUserChatMessage:{
        type : Array ,
        default: [],
        required:true,
    },
    ChatMessage:{
        type : Array ,
        default: [],
        required:true,
    }

},{timestamps:true})

export const ProductChatMessage = mongoose.models.ProductChatMessage || mongoose.model("ProductChatMessage",ProductChatMessageSchema);