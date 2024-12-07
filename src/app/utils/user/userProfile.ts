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
        if (id !== undefined) {
            const queryId = id as string
            const test: UserType = await User.findOne({_id: queryId}).exec()
            console.log(test)


            // console.log(searchUser)
            // return {
            //     id: searchUser?._id,
            //     userId: searchUser?.userId,
            //     username: searchUser?.username,
            //     email: searchUser?.email,
            //     profilePicture: searchUser?.profilePicture,
            //     coverProfilePicture: searchUser?.profilePicture,
            //     desc: searchUser?.desc,
            //     followers: searchUser?.followers,
            //     followings: searchUser?.followings,
            // }
            console.log("idididid")
            return null

        }
    } catch
        (err) {
        console.log(err)
        return null
    }


}

export default userProfile