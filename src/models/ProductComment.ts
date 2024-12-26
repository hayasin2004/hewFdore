import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface productCommentType {
    _id?: string;
    listingUserId?: string;
    buyerUserId?: UserType;
    productId?: string;
    buyerChatMessage?: string[];
    listingMessage?: string[];
    buyerMessageLike?: string[];
    listingMessageLike?: string[];
    listingChatMessage?: string;
    senderUserId? : string;
    buyerUsername? : string;
    buyerProfilePicture? :string;
    buyerMessage? : string;
    listingUsername? : string;
    listingProfilePicture? :string;
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
        senderUserId: {
            type: String,
            required: true,
        },
        buyerUsername: {
            type: String,
            required: true,
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
        }
    }],
    listingChatMessage: [{
        senderUserId: {
            type: String,
            required: true,
        },
        listingUsername: {
            type: String,
            required: true,
        },
        listingProfilePicture: {
            type: String,
            default: '',
        },
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