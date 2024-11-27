"use server"

import {string} from "prop-types";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";

const DirectMessageserver = async (detailUser?: string, currentUser?: string) => {
    await connectDB()



    try {
        console.log("erxtcyvugbijomkp" + currentUser)
        const partnerUserData = await User.findById({_id: detailUser});
        const currentUserData = await User.findById({_id: currentUser});
        console.log("対象のユーザー" + partnerUserData);
        console.log("ログインしているユーザー" + currentUserData);
    } catch (err) {
        console.log(err)
    }
}
export default DirectMessageserver
