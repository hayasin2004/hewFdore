"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import jwt from "jsonwebtoken";
import {UserType} from "@/app/api/user/catchUser/route";

const userInfoChange = async (userId: string | null, username: string | null, password: string | null, address: string | null, description: string | null, profilePicture: string | null, existToken: string | null) => {
    await connectDB()
    try {
        //console.log("userID" + username)
        const validationCheckUserData: UserType | null = await User.findOne({username: username}).select("username email")
        //console.log("取得できたかな" + validationCheckUserData?.username)
        if (validationCheckUserData?.username == username) {
            //console.log("そのユーザー名は既に登録されています。")

            const token: string | null = await jwt.sign({
                userId: userId, /*MongoDBからidを取得してきたのでmodels/User.tsには乗ってないです*/
            }, process.env.SECRET_KEY, {expiresIn: "2 day"})
            return {status: "existUsername", token: token}
        } else {

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
                const token = await jwt.sign({userId: userId}, process.env.SECRET_KEY, {expiresIn: "2 day"})
                //console.log(token)
                return {status: "successChangingData", NewToken: token}

            }

        }
    } catch (err) {
        console.log(err)
        return null
    }

}

export default userInfoChange