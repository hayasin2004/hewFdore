"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const searchProductCategoryServerAction = async  (category : string[] | null) => {
    await connectDB()
    try {
        const categoryResult = await Product.findOne({productCategory : category});

    //console.log(categoryResult)
    }catch (err){
        //console.log(err)
    }
}

export default searchProductCategoryServerAction
