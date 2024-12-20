import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface BuyerProductChatMessageType {
    _id: string;
    CurrentUserId?: UserType;
    productId?: string
    ByBuyerChatMessageUsers?: string
}

const BuyerProductChatMessageSchema = new mongoose.Schema({
    chatRoomId : {
        type: String,
        required: true,
    },
    productId:{
        type: String,
        required:true,
    },
    currentUserId:{
        type: String,
        required:true,
    },
    byBuyerChatMessage : {
        type : Array ,
        default: [],
        required:true,
    }

},{timestamps:true});
export const BuyerProductChatMessage = mongoose.models.BuyerProductChatMessage || mongoose.model("BuyerProductChatMessage",BuyerProductChatMessageSchema);

