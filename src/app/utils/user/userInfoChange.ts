"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import jwt from "jsonwebtoken";

const userInfoChange = async (userId: string | null, username: string |null, password: string | null, address: string | null, description: string | null, profilePicture: string | null, existToken: string | null) => {
    await connectDB()
    try {
        console.log(existToken!)
          const validationCheckUserData = await User.findOne({username: username}).select("username email")
           if (validationCheckUserData?.username == username) {


            const token: string | null = await jwt.sign({
                userId: userId, /*MongoDBからidを取得してきたのでmodels/User.tsには乗ってないです*/
            }, process.env.SECRET_KEY!, {expiresIn: "2 day"})
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
                const token = await jwt.sign({userId: userId}, process.env.SECRET_KEY!, {expiresIn: "2 day"})

                return {status: "successChangingData", NewToken: token}

            }

        }
    } catch (err) {
        console.log(err)
        return null
    }

}

export default userInfoChange