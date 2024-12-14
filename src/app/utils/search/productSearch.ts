"use server"

import {Product} from "@/models/Product";
import {$options} from "sift";
import {Stripe} from "stripe";
import {ProductType} from "@/app/utils/product/productDetail";

const productSearch = async (productSearchWord: string | null): Promise<string | null> => {
    try {
        if (productSearchWord === null) {
            console.log("文字を入力してください")
            return null
        }

        await console.log("個々のログ出てる？" + productSearchWord)
        // 検索対象のモノを表示
        const searching: ProductType[] | null = await Product.find(
            {sellerUserName: {$regex: productSearchWord, $options: "i"}},
        )
        console.log(searching)
        return JSON.stringify(searching)
    } catch (err) {
        return null
    }
}
export default productSearch;