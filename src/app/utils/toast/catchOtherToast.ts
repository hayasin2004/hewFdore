"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast} from "@/models/Toast";

const catchOtherToast  =async  (userId : string | null) => {
    await  connectDB()
    try {
         const toast = await Toast.find({userId: userId , toastCategory : "いいね、フォローなど"})
        return  JSON.stringify(toast)

    }catch (err){
        console.log(err)
        return null
    }

}

export default catchOtherToast;