"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Toast} from "@/models/Toast";
import {UserType} from "@/app/api/user/catchUser/route";

const toastFollowings = async (followingsUserId : string | null , followerUserId : string | null  ) => {
    await connectDB()
    // followingsUserId →　フォロー対象ユーザー　、　followerUserId　→　フォローするユーザー
    try {
        const followingsUser : UserType | null = await User.findById(followingsUserId);
        const followerUser : UserType | null = await User.findById(followerUserId);
        const purchase = {
            userId : followingsUserId,
            followerUserId : followerUserId,
            message : `${followerUser?.username}があなたをフォローしました。`,
            toastCategory : "いいね、フォローなど",
            alreadyRead : "未読",
        }
        const toastFollow = await  Toast.create(purchase)
        //console.log(toastFollow)
        //console.log("followingsUserId" + followingsUserId , "followerUserId" + followerUserId);
    }catch (err){
        //console.log(err)
        return null
    }

}

export default toastFollowings;