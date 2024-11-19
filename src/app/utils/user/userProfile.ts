"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextResponse} from "next/server";

const userProfile = async (id?: string) :Promise<UserType | null> => {
    await connectDB()
    try {
        const searchUser: UserType = await User.findOne({_id: id}).exec()

        if (!searchUser) {
            console.log("ユーザーが見つかりませんでした。")
            return null
        } else {
            console.log(searchUser)
            return {
                id: searchUser?._id,
                userId :searchUser?.userId,
                username : searchUser?.username,
                email : searchUser?.email,
                profilePicture :searchUser?.profilePicture,
                coverProfilePicture :searchUser?.profilePicture,
                desc :searchUser?.desc,
                followers :searchUser?.followers,
                followings :searchUser?.followings,
            }
        }

    } catch (err) {
        console.log(err)
        return null
    }

}

export default userProfile