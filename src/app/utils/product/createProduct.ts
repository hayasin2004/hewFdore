"use server"
import {connectDB} from "@/lib/mongodb";
import {v4 as uuidv4} from "uuid";
import {Product} from "@/models/Product";
import jwt from "jsonwebtoken";


export interface createProduct {
    product_id: string;
    productName: string;
    productPrice : string;
    shippingSend: string;

}

export  const createProduct = async (token : string ,　productName : string , productPrice :number , productDesc : string ,): Promise<createProduct | null> => {

    await connectDB();
    console.log("商品関連データベースと接続中")

    if (!token) {
        return null
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId =  decoded.userId
        const newProduct = await  Product.create({userId , productName ,  productPrice, productDesc})
        console.log("保存完了だよ")
        await newProduct.save()
    }catch (err){
        console.log(err)
    }





    return null
};

export default createProduct;