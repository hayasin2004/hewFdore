import mongoose from 'mongoose';
import {Binary} from "mongodb";

// as constを使用することで、この配列の要素はリテラル型（特定の文字列型）として扱われ、変更できないことを示しています。
const postageBurden = ["seller", "buyer"] as const;
type postageBurdenType = (typeof postageBurden)[number];

const productCondition = ["new", "nearNew", "littleScar", "scar"]
type productConditionType = (typeof productCondition)[number];

const productSize = ["XS", "S", "M", "L","LL","XL"]
type productSizeType = (typeof productSize)[number];

const deliveryTime = ["1to3day" , "3to5day" , "5to7day"]
type deliveryTimeType = (typeof deliveryTime)[number];

const sellStatus = ["selling" , "trading" , "soldOut"]
type sellStatusTimeType = (typeof deliveryTime)[number];

const ProductSchema = new mongoose.Schema({

        productId : {
            type : String,
            required:true
        },

        sellerId: {
            type: String,
            required: true,
        },
        sellerUserName: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            default : "",
        },
        productName: {
            type: String,
            required: true,
            default: '',
        },
        productDesc: {
            // 商品紹介
            type: String,
            max: 400,
            default: "",
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productImage: {
            type: String,
            default: '',
            required : true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        productCategory: {
            type: Array,
            default: [],
        },
        deliveryTime: {
            type: String,
            enum: deliveryTime,
            required: true,
        },
        productSize: {
            type: String,
            enum: productSize,
            required: true,
        },
        productCondition: {
            type: String,
            enum: productCondition,
            required: true,
        },
        postageBurden: {
            type: String,
            enum: postageBurden,
            required: true
        },
        sellStatus: {
            type: String,
            enum: sellStatus,
            default : "selling"
        },
        shippingArea: {
            type: String,
            required: true,
        },
        productLike: {
            type: Array,
            default: [],
        },
        comment: {
            type: Array,
            default: [],
        },
        stripeCode: {
            type: String,
            default: "",
        },
        payPayCode: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// モデルのエクスポート
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
