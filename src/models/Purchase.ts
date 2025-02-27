import mongoose from "mongoose";

interface SellerMessageStamp {
    sellerMessageStampLike?: string;
    userId?: string;
}

interface SellerChatMessage {
    _id?: string
    sellerUserId?: string;
    sellerUsername?: string;
    sellerProfilePicture?: string;
    sellerMessage?: string;
    sellerMessageLike?: string[];
    sellerMessageStamp?: SellerMessageStamp[]; // ここを配列として定義
    timeStamp?: Date;
}

interface BuyerChatMessage {
    _id : string
    buyerUserId: string;
    buyerUsername?: string;
    buyerProfilePicture?: string;
    buyerMessage?: string;
    buyerMessageLike?: string[];
    buyerMessageStamp?: {
        buyerMessageStampLike?: string;
        userId?: string;
    }[];
    timeStamp?: Date;
}

export interface TradeChat {
    _id: string;
    buyerChatMessage?: BuyerChatMessage[];
    sellerChatMessage?: SellerChatMessage[];
    chatUserRole?: string;
}

export interface PurchaseType {
    _id: string;
    purchaseId: string;
    chatUserRole:string;
    productId: string;
    sellerChatMessage?: SellerChatMessage[];
    buyerChatMessage?: BuyerChatMessage[];
    sellerId: string;
    buyerId: string;
    tradeChat?: TradeChat[];
    sellerUserLastChat?: string;
    buyerUserLastChat?: string;
    sellerUserLastReview?: (typeof review)[number];
    buyerUserLastReview?: (typeof review)[number];
    tradeStatus: (typeof tradeStatus)[number];
}

const tradeStatus = ["取引中", "取引完了", "取引終了", "取引キャンセル"] as const;
// type tradeStatusType = (typeof tradeStatus)[number];


const review = ["", "1", "2", "3", "4", "5"]
// type reviewType = (typeof review)[number];

const PurchaseSchema = new mongoose.Schema({
        purchaseId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            required: true,
        },
        tradeChat: [{

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
                    buyerMessageStampLike: {
                        type: String,
                        default: "",
                    },
                    userId: {
                        type: String,
                        default: ""
                    }
                }],
                timeStamp: {
                    type: Date,
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
                    sellerMessageStampLike: {
                        type: String,
                        default: "",
                    },
                    userId: {
                        type: String,
                        default: ""
                    }
                }],
                timeStamp: {
                    type: Date,
                    default: Date.now()
                }
            }],
            chatUserRole: {
                type: String,
                default: ""
            }
        }],
        sellerUserLastChat: {
            type: String,
            default: "",
        },
        buyerUserLastChat: {
            type: String,
            default: "",
        },
        sellerUserLastReview: {
            type: String,
            enum: review,
            default: ""
        },
        buyerUserLastReview: {
            type: String,
            enum: review,
            default: ""
        },
        tradeStatus: {
            type: String,
            enum: tradeStatus,
            default: "取引中",
            required: true,
        }

    }, {timestamps: true}
)

export const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);
