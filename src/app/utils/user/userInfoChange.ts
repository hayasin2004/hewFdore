"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import jwt from "jsonwebtoken";

const userInfoChange = async (userId: string | null, username: string | null, password: string | null, email: string | null, address: string | null, description: string | null) => {
    await connectDB()
    try {
        console.log("userID"+userId)

        const changeUser = await User.findByIdAndUpdate(userId, {
            $set: {
                _id : userId,
                username: username,
                password: password,
                email: email,
                address: address,
                desc: description,
            }
        }, {new: true, upsert: true})

        if (changeUser) {
            const token = await jwt.sign({userId: userId}, process.env.SECRET_KEY, {expiresIn: "2 day"})
            console.log(token)
            return token
        }

    } catch (err) {
        console.log(err)
        return null
    }

}

export default userInfoChange