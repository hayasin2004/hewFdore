"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextResponse} from "next/server";

const userProfile = async (detailUser: string) => {

    try {
        await connectDB()
        if (detailUser) {
            console.log(detailUser)
            const test = await User.findById('66d4f569d06498d8d6dd5539')
            console.log(test)
            if (!detailUser) {
                console.log("ユーザーが見つかりませんでした。")
                return null
            } else {
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
            }
        }

    } catch
        (err) {
        console.log(err)
        return null
    }


}

export default userProfile