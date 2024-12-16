"use server"

import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";
import {connectDB} from "@/lib/mongodb";

const productSearch = async (productSearchWord: string | null): Promise<string | null> => {
    await connectDB()
    try {
        if (productSearchWord === null) {
            console.log("文字を入力してください")
            return null
        }

        // 検索対象のモノを表示
        const searching: ProductType[] | null = await Product.find(
            {productDesc: {$regex: productSearchWord, $options: "i"}}
        ).exec()
        console.log(searching)
        return JSON.stringify(searching)
    } catch (err) {
        return null
    }
}
export default productSearch;