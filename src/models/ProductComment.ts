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
    senderUserId?: string;
    buyerUsername?: string;
    buyerProfilePicture?: string;
    buyerMessage?: string;
    listingUsername?: string;
    listingProfilePicture?: string;
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
    buyerUserIdList: {
        type: Array,
        default: []
    },
    productChat: [{

        buyerChatMessage: [{
            senderUserId: {
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
            buyerMessageStampLike: {
                type: Array,
                default: []
            },
            timeStamp: {
                type: Date,
                default: Date.now(),
            },
            buyerMessageStamp: [{
                buyerMessageStampLike: {
                    type: String,
                    default: "",
                },
                userId: {
                    type: String,
                }
            }],
        }],

        listingChatMessage: [{
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

            listingMessageStamp: [{
                listingMessageStampLike: {
                    type: String,
                    default: "",
                },
                userId: {
                    type: String,
                    required: true,
                }
            }],
            timeStamp: {
                type: Date,
                default: Date.now()
            },
        }],

        chatUserRole : {
            type: String,
            default : ""
        }
    }]

}, {timestamps: true});
export const ProductComment = mongoose.models.ProductComment || mongoose.model("ProductComment", ProductCommentSchema);