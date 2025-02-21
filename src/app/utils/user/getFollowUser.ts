"use server"

import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {User} from "@/models/User";

const getFollowUser = async (followings: string | null, followers: string | null) => {
    await connectDB()
    try {
        console.log("followers" + followings, "followers" + followers)
        const followersData: UserType[] = [];
        const followingsData: UserType[] = [];
        if (followers !== null || followings !== null) {
            for (const item of followers) {
                const test = await User.findById(item);
                console.log("フォロワー検索" + test);
                followersData.push(test);
            }
            for (const item of followings) {
                const test = await User.findById(item);
                console.log("フォロー検索" + test);
                followingsData.push(test);
            }

            return {followers :JSON.stringify(followersData) , followings : JSON.stringify(followingsData) }

        }


    } catch (err) {
        console.log(err)
        return null
    }
}
export default getFollowUser;