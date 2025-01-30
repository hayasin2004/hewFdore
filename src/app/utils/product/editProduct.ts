"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import jwt from "jsonwebtoken";
import {string} from "prop-types";
import {v4 as uuidv4} from 'uuid';
import toastProduct from "@/app/utils/product/toastProduct";
import addUserProductCategoryToMail from "@/app/utils/search/(product)/AddUserProductCategoryToMail";


export interface createProductType {
    productName: string;
    productPrice: string;
    shippingSend: string;
    product: string

}

// export  const editProduct = async (token : string ,　productName : string , productPrice :number , productDesc : string , shippingArea : string): Promise<createProductType | null> => {
export const editProduct = async (productId: string | null, productName: string | null, productDesc: string | null, productPrice: number | null, productCategory: string[] | null, deliveryTime: string | null, productSize: string | null, productCondition: string | null, postageBurden: string | null, shippingArea: string | null,): Promise<{
    result: string
} | null> => {
    // //console.log(productName, productDesc, productPrice, productCategory, deliveryTime, productSize, productCondition, postageBurden, shippingArea)
    await connectDB();
    //console.log("商品関連データベースと接続中")
    try {
        const updateProduct = await  Product.findByIdAndUpdate(productId , {
            $set : {
                productName: productName,
                productPrice: productPrice,
                productDesc: productDesc,
                productCategory: productCategory,
                productSize: productSize,
                productCondition: productCondition,
                postageBurden: postageBurden,
                shippingArea: shippingArea,
                deliveryTime: deliveryTime,
            }
        },{new : true , upsert: true}
        )
        //console.log(updateProduct)
        return {result: updateProduct};

    } catch (err) {
        console.log(err)
    }


    return null
};

export default editProduct;