import mongoose from 'mongoose';
import {string} from "prop-types";

// as constを使用することで、この配列の要素はリテラル型（特定の文字列型）として扱われ、変更できないことを示しています。
const postageBurden = ["seller", "buyer"] as const;
type postageBurdenType = (typeof postageBurden)[number];

const productCondition = ["new", "nearNew", "littleScar", "scar"]
type productConditionType = (typeof productCondition)[number];
//
// const productCategory = ["tops", "denim", "outer", "shirt", "t-shirt", "longSleeve", "perfume", "hat", "shoes"]
// type productCategoryType = (typeof productCategory)[number];
const ProductSchema = new mongoose.Schema({

        sellerId: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            required: true,
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
        productVideo: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        productCategory: {
            type: Array,
            default: [],
        },
        DeliveryTime: {
            type: Array,
            default: [],
            required: true,
        },
        like: {
            type: Array,
            default: [],
        },
        comment: {
            type: Array,
            default: [],
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
        shippingArea: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);