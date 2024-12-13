"use server"

import {Product} from "@/models/Product";
import {$options} from "sift";
import {Stripe} from "stripe";
import {ProductType} from "@/app/utils/product/productDetail";

const productSearch = async (productSearchWord: string | null): Promise<string[] | null> => {
    try {

        const TestProductSearchWord = "てすとゆーざーです"
        console.log(TestProductSearchWord)
        const searching: string[] = await Product.find({sellerUserName: {$regex: TestProductSearchWord, $options: "i"}})
        console.log(searching)
        return searching
    } catch (err) {
        return null
    }
}
export default productSearch;