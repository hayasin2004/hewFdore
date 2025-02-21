"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

export interface ProductType {
    product?: string;
    productId?: string;
    id?: string
    _id?: string,
    sellerId?: string,
    buyerId?: string,
    sellerUserName?: string,
    username?: string,
    productName?: string,
    productDesc?: string,
    productPrice?: string,
    productPicture?: string,
    productVideo?: string,
    productSize?: string,
    sellStatus?: string,
    productCategory?: string,
    shippingArea?: string,
    productLike?: string,
    postageBurden?: string,
    productCondition?: string,
    productImage?: string,
    productImage2?: string,
    productImage3?: string,
    productImage4?: string,
    stripeCode?: string
    payPayCode?: string
    tradeId?: string
}


const productDetail = async (id: string)=> {
     await connectDB()
    try {
        console.log("まずここまで来たかの確認" + id)
        const product = await Product.findById(id)
        console.log(product)
        return {product: JSON.stringify(product)}
    } catch (err) {
        console.error(err)
        console.error(err)
        return null
    }
}

export default productDetail;
