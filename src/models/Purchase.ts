import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface PurchaseType {
    currentUser?: UserType;
    partnerUser?: UserType;
    message?: string
    partnerUserMessage?: string
    newChatRoom? : string
}

const tradeStatus = ["取引中", "取引完了" , "取引終了" , "取引キャンセル"] as const;
type tradeStatusType = (typeof tradeStatus)[number];


const review = ["","1", "2", "3", "4","5"]
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
        buyerUserId: {
            type: String,
            required: true,
        },
        buyerUsername: {
            type: String,
        },
        buyerProfilePicture: {
            type: String,
            default: '',
        },
        buyerMessage: {
            type: String,
            default: "",
        },
        buyerMessageLike: {
            type: Array,
            default: []
        },
        buyerMessageStamp: [{
            buyerMessageStampLike:{
                type: String,
                default: "",
            },
            userId : {
                type : String,
            }
        }],
        timeStamp : {
            type : Date,
            default: Date.now(),
        }
    }],
    sellerChatMessage: [{
        sellerUserId: {
            type: String,
            required: true,
        },
        sellerUsername: {
            type: String,
        },
        sellerProfilePicture: {
            type: String,
            default: '',
        },
        sellerMessage: {
            type: String,
            default: ""
        },
         sellerMessageLike: {
            type: Array,
            default: []
        },
        sellerMessageStamp: [{
            sellerMessageStampLike:{
                type: String,
                default: "",
            },
            userId : {
                type : String,
            }
        }],
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
    sellerUserLastReview : {
        type: String,
        enum: review,
        default : ""
    },
    buyerUserLastReview : {
        type: String,
        enum: review,
        default : ""
    },
    tradeStatus :{
        type : String ,
        enum : tradeStatus,
        default: "取引中",
        required:true,
    }

})

export const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);