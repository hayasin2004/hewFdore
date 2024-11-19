"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import { User } from "@/models/User";

export interface ProductType {
    id?: string
    _id?: string,
    userId?: string,
    username? :string,
    productName?: string,
    productDesc?: string,
    productPrice?: string,
    productPicture?: string,
    productVideo?: string,

}


const productDetail = async (id: string): Promise<ProductType | null> => {
    await connectDB()
    console.log("データベースから取得してきた")
    try {
        const product: ProductType = await Product.findById({_id: id}).exec()
        const userName : ProductType = await User.findById({_id: product.userId}).exec()
        return {
            id: product?._id,
            userId: product?.userId,
            username : userName.username,
            productName: product?.productName,
            productDesc: product?.productDesc,
            productPrice: product?.productPrice,
            productPicture: product?.productPicture,
            productVideo: product?.productVideo
        }
    } catch (err) {
        console.error(err)
        return null
    }
}

export default productDetail;
