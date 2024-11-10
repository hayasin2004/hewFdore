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

export  const createProduct = async (token : string ,　productName : string , productPrice :number , productDesc : string , shippingArea : string): Promise<createProductType | null> => {

    await connectDB();
    console.log("商品関連データベースと接続中")

    if (!token) {
        return null
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId =  decoded.userId
        const newProduct = await  Product.create({userId , productName ,  productPrice, productDesc ,shippingArea})
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