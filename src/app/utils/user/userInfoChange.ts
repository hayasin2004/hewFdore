"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const userInfoChange = async (userId: string | null, username: string | null, password: string | null, email: string | null, address: string | null, description: string | null) => {
    await connectDB()
    try {
        const changeUser = await User.findByIdAndUpdate(userId, {
            $set: {
                username: username,
                password: password,
                email: email,
                address: address,
                description: description,
            }
        }, {new: true, upsert: true})

        console.log(changeUser)

    } catch (err) {
        console.log(err)
        return null
    }

}

export default userInfoChange