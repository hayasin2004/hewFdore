"use server"

import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";
import {connectDB} from "@/lib/mongodb";

const productCategorySearch = async (productSearchWord: string | null): Promise<string | null> => {
    await connectDB()

    try {
        if (productSearchWord === null) {
            return null
        }
        const searching: ProductType[] | null = await Product.find({productCategory : productSearchWord}).exec()
        console.log(searching)
        return JSON.stringify(searching)

    } catch (err) {
        console.log(err)
        return null
    }
}
export default productCategorySearch;