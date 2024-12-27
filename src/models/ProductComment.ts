import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface productCommentType {
    _id?: string;
    listingUserId?: string;
    buyerUserId?: UserType;
    productId?: string;
    ChatMessage?: string[];
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
    chatMessage: [{
        senderUserId: {
            type: String,
            required: true,
        },
        listingUsername: {
            type: String,
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
        },
        buyerUserId: {
            type: Array,
            default: []
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
        }
    }],

}, {timestamps: true});
export const ProductComment = mongoose.models.ProductComment || mongoose.model("ProductComment", ProductCommentSchema);