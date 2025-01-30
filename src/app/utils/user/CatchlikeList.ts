"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import toastGmailForPurchase from "@/app/utils/product/toastGmailForPurchase";

const CatchLikeList = async (loginNowUserId: UserType | null):Promise<{ likeList: string } | null> => {
    await connectDB()
    try {
            //console.log("今見ているユーザーは同じユーザーです。")
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