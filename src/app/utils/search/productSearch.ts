"use server"

import {Product} from "@/models/Product";
import {$options} from "sift";
import {Stripe} from "stripe";
import {ProductType} from "@/app/utils/product/productDetail";

const productSearch = async (productSearchWord: string | null): Promise<string | null> => {
    // if (productSearchWord === null) {
    //     console.log("文字を入力してください")
    //     return null
    // }
    try {
        // 検索対象のモノを表示
        const searching: ProductType[] | null = await Product.find(　
                {productName : {$regex : productSearchWord , $options : "i"}},　
       　)
        console.log("adaffasd"+searching)
        return JSON.stringify(searching)
    } catch (err) {
        return null
    }
}
export default productSearch;