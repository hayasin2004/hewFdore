"use server"

import {string} from "prop-types";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";

const DirectMessageserverAction =async (detailUser :string ,currentUser : string)=> {
    await connectDB()
    console.log("erxtcyvugbijomkp" +currentUser)
    const partnerUserData = await User.findById({_id : detailUser});
    const currentUserData = await User.findById({_id : currentUser});
    console.log("対象のユーザー" + partnerUserData);
    console.log("ログインしているユーザー" + currentUserData);
}
export default DirectMessageserverAction