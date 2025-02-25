import mongoose from 'mongoose';

// as constを使用することで、この配列の要素はリテラル型（特定の文字列型）として扱われ、変更できないことを示しています。
const postageBurden = ["出品者", "購入者"] as const;
// type postageBurdenType = (typeof postageBurden)[number];

const productCondition = ["新品未使用", "未使用に近い", "多少使用感がある", "使用感がある"]
// type productConditionType = (typeof productCondition)[number];

const productSize = ["XS", "S", "M", "L","LL","XL"]
// type productSizeType = (typeof productSize)[number];

const deliveryTime = ["1日から3日" , "3日から5日" , "5日から7日"]
// type deliveryTimeType = (typeof deliveryTime)[number];

const sellStatus = ["販売中" , "取引中" , "売り切れ"]
// type sellStatusTimeType = (typeof deliveryTime)[number];

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
        productImage2: {
            type: String,
            default: '',
        },
        productImage3: {
            type: String,
            default: '',
        },
        productImage4: {
            type: String,
            default: '',
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
            default : "販売中"
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
        tradeId: {
            type: String,
            default: "",
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
