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


const review = ["1", "2", "3", "4","5"]
type reviewType = (typeof review)[number];

const PurchaseSchema = new mongoose.Schema({
    purchaseId : {
        type: String,
        required: true,
    },
    productId : {
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
    buyerChatMessage: [{
        buyerMessage: {
            type: String,
            default: "",
        },
        buyerMessageLike: {
            type: Array,
            default: []
        },
        timeStamp : {
            type : Date,
            default: Date.now(),
        }
    }],
    sellerChatMessage: [{
        sellerMessage: {
            type: String,
            default: ""
        },
        sellerMessageLike: {
            type: Array,
            default: []
        },
        timeStamp : {
            type : Date ,
            default : Date.now()
        }
    }],
    sellerUserLastChat : {
        type : String ,
        default: "",
    },
    buyerUserLastChat : {
        type : String ,
        default: "",
    },
    sellerUserReview : {
        type: String,
        enum: review,
    },
    buyerUserLastReview : {
        type: String,
        enum: review,
    },
    tradeStatus :{
        type : String ,
        enum : tradeStatus,
        default: "取引中",
        required:true,
    }

})

export const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);