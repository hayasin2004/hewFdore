"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import jwt from "jsonwebtoken";

const updateFollowings = async (userFollowings? : string , loginNowUserId?: string)  => {
    await connectDB()
    try {
        // フォローする人
        const user = await User.findById({_id : userFollowings})
        // フォローされる人
        const currentUser = await  User.findById({_id : loginNowUserId})
        // フォローの処理
        const  following  = await currentUser.updateOne({followings : user})
        // フォローされる側の処理
        const followers =  await user.updateOne({$push: {followers: currentUser._id}})
        console.log("追加された？"+JSON.stringify(followers))
        if (!following) {
            console.log("ログインしてからフォローしてください")
            return  null
        }
        console.log("following", following)
        console.log("followers", followers)
    }catch (err){
        console.log(err)
        return null
    }
}
export default updateFollowings;