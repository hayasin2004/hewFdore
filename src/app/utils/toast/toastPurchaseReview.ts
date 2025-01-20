"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast} from "@/models/Toast";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

// 通知を追加する機能
const toastPurchaseReview = async  (currentUserId : string | null ,productId : string | null ,lastMessage : string | null , reviewValue : string | null ) => {
// const toastPurchaseReview = async  () => {
    await connectDB()
    try {
        const user : UserType | null = await User.findOne({_id : currentUserId})
        const product : ProductType | null = await Product.findById({_id : productId})
        const purchase = {
            userId : user?._id,
            productId : product?._id,
            productName : product?.productName,
            message : `商品「${product?.productName}」が評価されました！評価メッセージ ${lastMessage} , 評価 ${reviewValue} `,
            toastCategory : "いいね、フォローなど",
            alreadyRead : "未読",
        }

        const toastPurchase = await Toast.create(purchase)
        await toastPurchase.save()


    }catch (err){
        console.log(err)
        return null
    }
}
export default toastPurchaseReview;