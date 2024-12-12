"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import jwt from "jsonwebtoken";

const updateFollowings = async (userFollowings?: string | null, loginNowUserId?: string | null): Promise<{
    followers: string | null
} | string | null> => {
    await connectDB()
    try {
        // フォローされる人
        const user = await User.findById({_id: userFollowings})
        // フォローする人
        const currentUser = await User.findById({_id: loginNowUserId})
        // console.log(user)
        if (currentUser.followings.includes(user._id)) {
            console.log("フォロー解除しました。")
            // フォローの処理
            const following: string | null = await currentUser.updateOne({$pull: {followings: user._id}})
            // フォローされる側の処理
            const followers: string | null = await user.updateOne({$pull: {followers: currentUser._id}})

            return null
        } else {

            // フォローの処理
            const following: string | null = await currentUser.updateOne({$push: {followings: user._id}})
            // フォローされる側の処理
            const followers: string | null = await user.updateOne({$push: {followers: currentUser._id}})
            if (!following) {
                console.log("ログインしてからフォローしてください")
                return null
            }
            console.log("following", following)
            console.log("followers", followers)
            return {followers: followers}
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default updateFollowings;