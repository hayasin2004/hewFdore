"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast, ToastType} from "@/models/Toast";

const catchToastProduct  =async  (userId : string | null) => {
    await  connectDB()
    try {
        //console.log(userId);
        const toast : ToastType[] | null = await Toast.find({userId: userId , toastCategory : "商品関連"})
        // //console.log("既存の通知"+toast);

        return  JSON.stringify(toast)

    }catch (err){
        console.log(err)
        return null
    }

}

export default catchToastProduct;