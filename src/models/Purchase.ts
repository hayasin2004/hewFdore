import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface PurchaseType {
    currentUser?: UserType;
    partnerUser?: UserType;
    message?: string
    partnerUserMessage?: string
    newChatRoom? : string
}

const tradeStatus = ["取引中", "取引完了" , "取引終了"] as const;
type tradeStatusType = (typeof tradeStatus)[number];

const PurchaseSchema = new mongoose.Schema({
    purchaseId : {
        type: String,
        required: true,
    },
    sellerId : {
        type: String,
        required: true,
    },
    buyerId : {
        type: String,
        required: true,
    },
    sellerUserChat : {
        type : Array ,
        default: [],
    },
    buyerUserChat : {
        type : Array ,
        default: [],
    },
    tradeStatus :{
        type : String ,
        enum : tradeStatus,
        default: "取引中",
        required:true,
    }

})

export const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);