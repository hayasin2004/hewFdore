"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

const userProfile = async (id?: string) => {
    await connectDB()
    try {
            const searchUser: UserType = await User.findOne({_id:id}).exec()
            console.log(searchUser)
            // console.log(searchUser)
            return {
                id: searchUser?._id,
                userId: searchUser?.userId,
                username: searchUser?.username,
                email: searchUser?.email,
                profilePicture: searchUser?.profilePicture,
                coverProfilePicture: searchUser?.profilePicture,
                desc: searchUser?.desc,
                followers: searchUser?.followers,
                followings: searchUser?.followings,
            }
            console.log("idididid")
            return null

    } catch
        (err) {
        console.log(err)
        return null
    }


}

export default userProfile