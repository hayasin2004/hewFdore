"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";

const CatchLikeList = async (loginNowUserId: string | null | undefined) => {
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