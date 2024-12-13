"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";

const CatchLikeList = async (loginNowUserId: UserType | null):Promise<UserType | null> => {
    await connectDB()
    try {
        const likeList: UserType | null= await User.findOne({_id: loginNowUserId}).select("likeList")
        if (likeList?._id == loginNowUserId) {
            console.log("今見ているユーザーは同じユーザーです。")
            return {likeList : likeList?.likeList}
        }
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}

export default CatchLikeList