"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast} from "@/models/Toast";

const catchOtherToast  =async  (userId : string | null) => {
    await  connectDB()
    try {
        //console.log(userId);
        const toast = await Toast.find({userId: userId , toastCategory : "いいね、フォローなど"})
        // //console.log("既存の通知"+toast);

        return  JSON.stringify(toast)

    }catch (err){
        //console.log(err)
        return null
    }

}

export default catchOtherToast;