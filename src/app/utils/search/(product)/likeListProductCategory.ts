"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";

const likeListProductCategory = async (userId: string | undefined, category: string | null) => {
    await connectDB()
    try {
        const userSearch = await User.findById(userId);
        const categoryPush : UserType = await userSearch.updateOne({$push: {productCategoryLikeList : category }})
        console.log(categoryPush)
    } catch (err) {
        console.log(err)
    }
}

export default likeListProductCategory
