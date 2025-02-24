"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from 'uuid';
import toastProduct from "@/app/utils/product/toastProduct";
import addUserProductCategoryToMail from "@/app/utils/search/(product)/AddUserProductCategoryToMail";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import testVideoSave from "@/app/utils/product/testvideoSave";


export interface createProductType {
    productName: string;
    productPrice: string;
    shippingSend: string;
    product: string

}


 export const createProduct = async (token: string | null, productName: string | null, productDesc: string | null, productPrice: number | null, productCategory: string[] | null, deliveryTime: string | null, productSize: string | null, productCondition: string | null, postageBurden: string | null, shippingArea: string | null, productImage: string | null, data: FormData | null,productImage2 : string | null, productImage3 : string | null, productImage4 : string | null,): Promise<{
    result: string
} | null> => {
     await connectDB();

    if (!token) {
        return null
    }
    try {
        console.log("渡ってきてるかの確認")
        const saveVideo = await testVideoSave(data)
        if (saveVideo !== null) {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            const sellerId = decoded.userId
            const sellerUserData: UserType | null = await User.findById(sellerId);
            const productId = uuidv4()
            const newProduct = await Product.create({
                productId,
                sellerId,
                sellerUserName: sellerUserData?.username,
                productName,
                productPrice,
                productDesc,
                productCategory,
                productSize,
                productCondition,
                postageBurden,
                shippingArea,
                deliveryTime,
                productImage,
                productImage2,
                productImage3,
                productImage4,
                productVideo : saveVideo,
                sellStatus: "販売中"
            })
            await newProduct.save()
            const CompleteproductId = newProduct._id
            const CompletesellerId = newProduct.sellerId
            await toastProduct(CompleteproductId, CompletesellerId)
             addUserProductCategoryToMail(newProduct.productCategory, newProduct)
              toastProduct(newProduct._id, newProduct.sellerId)
            const returnProduct = JSON.stringify(newProduct)
            return {result: returnProduct};
        }
        if (saveVideo  == null) {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            const sellerId = decoded.userId
            const sellerUserData: UserType | null = await User.findById(sellerId);
            const productId = uuidv4()
            const newProduct = await Product.create({
                productId,
                sellerId,
                sellerUserName: sellerUserData?.username,
                productName,
                productPrice,
                productDesc,
                productCategory,
                productSize,
                productCondition,
                postageBurden,
                shippingArea,
                deliveryTime,
                productImage,
                productImage2,
                productImage3,
                productImage4,
                sellStatus: "販売中"
            })
            await newProduct.save()
            const CompleteproductId = newProduct._id
            const CompletesellerId = newProduct.sellerId
            await toastProduct(CompleteproductId, CompletesellerId)
             addUserProductCategoryToMail(newProduct.productCategory, newProduct)
             toastProduct(newProduct._id, newProduct.sellerId)
            const returnProduct = JSON.stringify(newProduct)
            return {result: returnProduct};
        }
    } catch (err) {
        console.log(err)
    }


    return null
};

export default createProduct;
