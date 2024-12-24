import mongoose from "mongoose";
import {UserType} from "@/app/api/user/catchUser/route";

export interface productCommentType {
    _id?: string;
    listingUserId? : string;
    buyerUserId?: UserType;
    productId?: string;
    ByBuyerChatMessageUsers?: string;
    listingChatMessage?:string;
}

const ProductCommentSchema = new mongoose.Schema({

    productId:{
        type: String,
        required:true,
    },
    listingUserId:{
        type: String,
        default : ""　
    },
    buyerUserId:{
        type: String,
        default : ""
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
    },
    buyerChatMessageLike : {
        type : Array ,
        default: [],
    },
    listingChatMessageLike : {
        type : Array ,
        default: [],
     }

},{timestamps:true});
export const ProductComment = mongoose.models.ProductComment || mongoose.model("ProductComment" , ProductCommentSchema);

