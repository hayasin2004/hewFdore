import mongoose from "mongoose";

export interface ProductCommentType {
    _id?: string;
    listingUserId?: string;
    buyerUserIdList?: string[];
    productId?: string;
    ChatMessage?: string[];
    productChat: [{
        listingMessage?: string[];
        productChat?: string[];
        buyerMessageLike?: string[];
        listingMessageLike?: string[];
        buyerMessageStampLike?: string
        listingMessageStampLike?: string
        listingMessageStamp?: string[]
        listingChatMessage?: string;
        senderUserId?: string;
        userId?: string;
        buyerUsername?: string;
        buyerProfilePicture?: string;
        buyerChatMessage?: string;
        listingUsername?: string;
        listingProfilePicture?: string;
        chatUserRole?: string
    }]
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
            buyerMessageLike: {
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
                    default: ""
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

        chatUserRole: {
            type: String,
            default: ""
        }
    }]

}, {timestamps: true});
export const ProductComment = mongoose.models.ProductComment || mongoose.model("ProductComment", ProductCommentSchema);