"use server"

import {Product} from "@/models/Product";
import {$options} from "sift";

const productSearch = async (productSearchWord : string) => {
    const TestProductSearchWord = "てすとゆーざーです"
    console.log(TestProductSearchWord)
    const searching = await Product.find({sellerUserName : {$regex :  TestProductSearchWord , $options : "i"}})
    console.log(searching)
}
export default productSearch;