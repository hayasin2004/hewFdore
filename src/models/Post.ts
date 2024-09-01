import mongoose  from 'mongoose';

const ProductPost = new  mongoose.Schema({
    userId : {
        type: String,
        required: true,
    },
    productName : {
        type: String,
        required: true,
    },
    productDesc : {
        // 商品紹介
        type: String,
        max: 400,

    },
    productPrice : {
        type: Number,
        required: true,
    },
    productVideo :{
        type: String,
        default: '',
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }
},
    {timestamps: true}
)
module.exports = mongoose.model("Product" , ProductPost)