"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import jwt from "jsonwebtoken";
import {string} from "prop-types";



export interface createProductType {
    productName: string;
    productPrice : string;
    shippingSend: string;

}

// export  const createProduct = async (token : string ,　productName : string , productPrice :number , productDesc : string , shippingArea : string): Promise<createProductType | null> => {
export  const createProduct = async (
    token : string |null,
    productName : string |null,
    productDesc : string |null,
    productPrice : number |null,
    productCategory : string[] |null,
    deliveryTime : string |null,
    productSize : string |null,
    productCondition : string |null,
    postageBurden : string |null,
    shippingArea : string |null,
): Promise<createProductType | null> => {
    console.log(
    productName,
    productDesc,
    productPrice,
    productCategory,
    deliveryTime,
    productSize,
    productCondition,
    postageBurden,
    shippingArea)
    await connectDB();
    console.log("商品関連データベースと接続中")

    if (!token) {
        return null
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const sellerId =  decoded.userId
        const newProduct = await  Product.create({
            sellerId ,
            productName,
            productPrice,
            productDesc,
            productCategory,
            productSize,
            productCondition,
            postageBurden,
            shippingArea,
            deliveryTime,})
        await newProduct.save()
        console.log("保存完了だよ")

        const returnProduct = newProduct.toObject();
        return returnProduct;
    }catch (err){
        console.log(err)
    }





    return null
};

export default createProduct;