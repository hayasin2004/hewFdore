import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface BuyerProductChatMessageType {
    _id?: string;
    listingUserId? : string;
    currentUserId?: UserType;
    productId?: string;
    ByBuyerChatMessageUsers?: string;
    listingChatMessage?:string;
}

const BuyerProductChatMessageSchema = new mongoose.Schema({

    productId:{
        type: String,
        required:true,
    },
    listingUserId:{
        type: String,
        required:true,
    },
    currentUserId:{
        type: String,
        required:true,
    },
    buyerChatMessage : {
        type : Array ,
        default: [],
        required:true,
    },
    listingChatMessage : {
        type : Array ,
        default: [],
        required:true,
    }

},{timestamps:true});
export const BuyerProductChatMessage = mongoose.models.BuyerProductChatMessage || mongoose.model("BuyerProductChatMessage",BuyerProductChatMessageSchema);

