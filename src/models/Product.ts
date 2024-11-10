import mongoose  from 'mongoose';

const ProductSchema = new  mongoose.Schema({

    userId : {
        type: String,
        required: true,
    },
    productName : {
        type: String,
        required: true,
        default: '',
    },
    productDesc : {
        // 商品紹介
        type: String,
        max: 400,
        default: "",
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
export const  Product = mongoose.models.Product ||  mongoose.model("Product" , ProductSchema);