"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {ObjectId} from "mongodb";
import {GridFSBucket} from "mongodb";

export interface ProductType {
    product?: string;
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
    stripeCode?: string
    payPayCode?: string
    tradeId?: string
}


const productDetail = async (id: string): Promise<{ product: string | null } | { video: string | null } | null> => {
    const mongoScheme = await connectDB()
    try {
        console.log("まずここまで来たかの確認" + id)
        // const db = mongoScheme.connection.db
        const product: ProductType | null = await Product.findById(id)
        console.log(product)
        return {product: JSON.stringify(product)}
        // return {product: JSON.stringify(product) , video : JSON.stringify(video)}

        //console.log(userName)

    } catch (err) {
        console.error(err)
        console.error(err)
        return null
    }
}

export default productDetail;

// return {
// product: {
//     sellerId: userName?.sellerId,
//     _id: product?._id,
//     username: userName.username,
//     productName: product?.productName,
//     productDesc: product?.productDesc,
//     productSize: product?.productSize,
//     productCategory: product?.productCategory,
//     postageBurden: product?.postageBurden,
//     shippingArea: product?.shippingArea,
//     productLike: product?.shippingArea,
//     productCondition: product?.productCondition,
//     productPrice: product?.productPrice,
//     productPicture: product?.productPicture,
//     productVideo: product?.productVideo
// }