import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface productCommentType {
    _id?: string;
    listingUserId?: string;
    buyerUserId?: UserType;
    productId?: string;
    buyerMessage? : string[];
    listingMessage? : string[];
    buyerMessageLike? : string[];
    listingMessageLike? : string[];
    ByBuyerChatMessageUsers?: string;
    listingChatMessage?: string;
}

const ProductCommentSchema = new mongoose.Schema({

    productId: {
        type: String,
        required: true,
    },
    listingUserId: {
        type: String,
        default: ""
    },
    buyerUserId: {
        type: String,
        default: ""
    },
    buyerChatMessage: [{
        buyerMessage: {
            type: String,
            default: ""
        },
        buyerMessageLike: {
            type: Array,
            default: []
        }
    }],
    listingChatMessage: [{
        listingMessage: {
            type: String,
            default: ""
        },
        listingMessageLike: {
            type: Array,
            default: []
        }
    }]

}, {timestamps: true});
export const ProductComment = mongoose.models.ProductComment || mongoose.model("ProductComment", ProductCommentSchema);