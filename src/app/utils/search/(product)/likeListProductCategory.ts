"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const likeListProductCategory = async (userId: string | null, category: string []| null) => {
    await connectDB()
    try {
        const userSearch = await User.findById(userId);
        const categoryPush = await userSearch.updateOne({$push: {productCategoryLikeList : category}})
        console.log(categoryPush)
    } catch (err) {
        console.log(err)
    }
}

export default likeListProductCategory
