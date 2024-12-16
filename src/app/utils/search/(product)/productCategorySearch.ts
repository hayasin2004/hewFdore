"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";

const productCategorySearch = async () => {
    await  connectDB()
    try {
        const searchProductCategory = await User.find({productCategoryLikeList : "outer"}).select("username email productCategory");
        console.log(searchProductCategory)



    }catch (err){
        console.error(err)
    }
}
export default productCategorySearch