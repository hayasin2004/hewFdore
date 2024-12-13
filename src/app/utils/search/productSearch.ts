"use server"

import {Product} from "@/models/Product";
import {$options} from "sift";
import {Stripe} from "stripe";
import {ProductType} from "@/app/utils/product/productDetail";

const productSearch = async (productSearchWord: string | null): Promise<string | null> => {
    try {

        const TestProductSearchWord = "a"
        console.log(TestProductSearchWord)
        const searching:ProductType[] | null = await Product.find({productDesc: {$regex: TestProductSearchWord, $options: "i"}})
        console.log(searching)
        return JSON.stringify(searching)
    } catch (err) {
        return null
    }
}
export default productSearch;