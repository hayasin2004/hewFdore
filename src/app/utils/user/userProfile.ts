"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";
import getFollowUser from "@/app/utils/user/getFollowUser";

const userProfile = async (id: UserType | null):Promise<{searchUser : UserType} | {searchProduct : ProductType}|null> => {
    await connectDB()
    console.log("ユーザー特定したい" + id)
    try {
        if (id !== undefined && id !== null) {
            const searchUser = await User.findOne({_id: id})
            const searchProduct: ProductType[] | null = await Product.find({sellerId: id})
            const followData = await getFollowUser(searchUser?.followings, searchUser?.followers)
            const followersData = followData?.followers
            const followingsData = followData?.followings
            console.log(searchUser, followersData, followingsData)
            return {
                searchUser: JSON.stringify(searchUser),
                searchProduct: JSON.stringify(searchProduct),
                followers: JSON.stringify(followersData),
                followings: JSON.stringify(followingsData),
            }
        }

    } catch
        (err) {
        console.log(err)
        return null
    }


}

export default userProfile