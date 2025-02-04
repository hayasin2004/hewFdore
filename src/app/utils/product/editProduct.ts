"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";


export interface createProductType {
    productName: string;
    productPrice: string;
    shippingSend: string;
    product: string

}

export const editProduct = async (productId: string | null, productName: string | null, productDesc: string | null, productPrice: number | null, productCategory: string[] | null, deliveryTime: string | null, productSize: string | null, productCondition: string | null, postageBurden: string | null, shippingArea: string | null,): Promise<{
    result: string } | null> => {
    await connectDB();
    try {
        const updateProduct = await Product.findByIdAndUpdate(productId, {
                $set: {
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
            }, {new: true, upsert: true}
        )
         return {result: updateProduct};

    } catch (err) {
        console.log(err)
    }


    return null
};

export default editProduct;