"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import jwt from "jsonwebtoken";

const userInfoChange = async (userId: string | null, username: string | null, password: string | null, address: string | null, description: string | null, profilePicture: string | null, existToken: string | null) => {
    await connectDB()
    try {
        console.log("existToken" + existToken, "userId" + userId, "username" + userId, "password" + password, "address" + address + "description" + description, "profilePicture" + profilePicture)
        const validationCheckUserData = await User.findOne({username: username}).select("username email")
        if (validationCheckUserData) {
            const changeUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    _id: userId,
                    username: username,
                    password: password,
                    address: address,
                    desc: description,
                    profilePicture: profilePicture
                }
            }, {new: true, upsert: true})
            if (changeUser) {
                const token = jwt.sign({userId: userId}, process.env.SECRET_KEY!, {expiresIn: "2 day"})

                return {status: "successChangingData", NewToken: token}

            }
        }
    } catch (err) {
        console.log(err)
        return null
    }

}

export default userInfoChange