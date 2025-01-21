"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Toast} from "@/models/Toast";

const setupfollowerUserId = async () => {
    await connectDB()

    try {
        const update = await Toast.updateMany(
            {likedUserId: {$exists: false}},
            {$set: {likedUserId: ""}}
        )
        console.log(update)
    } catch (err) {
        console.log(err)
        return null
    }

}
export default setupfollowerUserId