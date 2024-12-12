"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import jwt from "jsonwebtoken";

const updateFollowings = async (userFollowings? : string  | null, loginNowUserId?: string  | null):Promise<string | null> => {
    await connectDB()
    try {
        // フォローする人
        const user = await User.findById({_id : userFollowings})
        // フォローされる人
        const currentUser = await  User.findById({_id : loginNowUserId})
        console.log(user)
        // フォローの処理
        const  following  = await currentUser.updateOne({followings : currentUser})
        // フォローされる側の処理
        const followers =  await user.updateOne({followers : currentUser})
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