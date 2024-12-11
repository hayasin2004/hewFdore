"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";

export interface ProductType {
    product: string;
    id?: string
    _id?: string,
    sellerId?: string,
    username?: string,
    productName?: string,
    productDesc?: string,
    productPrice?: string,
    productPicture?: string,
    productVideo?: string,
    productSize?: string,
    productCategory?: string,
    shippingArea?: string,
    productLike?: string,
    postageBurden?: string,
    productCondition?: string

}


const productDetail = async (id: string, currentUser: string): Promise<ProductType | null> => {
    await connectDB()
    try {
        const product: ProductType = await Product.findById(id)
        const userName: ProductType = await User.findOne({_id: product.sellerId}).exec()
        console.log(userName)
        return {product: JSON.stringify(product)}
    } catch (err) {
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