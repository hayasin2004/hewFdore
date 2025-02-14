"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";

const CatchLikeList = async (loginNowUserId: UserType | null):Promise<{ likeList: string } | null> => {
    await connectDB()
    try {
         const likeList 　= await User.findOne({_id: loginNowUserId}).select("likeList")

        if (likeList?.likelist == loginNowUserId) {
            return {likeList : JSON.stringify(likeList?.likeList)}
        }
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}

export default CatchLikeList