"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import toastFollowings from "@/app/utils/toast/toastFollowings";

const updateFollowings = async (userFollowings?: string | null, loginNowUserId?: string | null): Promise<{
    followers: string | null
} | {
    toastFollow: string | null
} | string | null> => {
    await connectDB()
    try {
        const user = await User.findById({_id: userFollowings})
        const currentUser = await User.findById({_id: loginNowUserId})
        if (currentUser.followings.includes(user._id)) {
            const following: string | null = await currentUser.updateOne({$pull: {followings: user._id}})

            const followers: string | null = await user.updateOne({$pull: {followers: currentUser._id}})
            console.log(followers, following)
            return null
        } else {

            const following: string | null = await currentUser.updateOne({$push: {followings: user._id}})

            const followers: string | null = await user.updateOne({$push: {followers: currentUser._id}})
            if (!following) {
                return null
            }
            const toastFollow = await toastFollowings(user?._id, currentUser?._id)

            return {followers: followers, toastFollow: toastFollow}
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default updateFollowings;