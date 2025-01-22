"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast} from "@/models/Toast";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

// 通知を追加する機能
const toastPurchaseReview = async  (currentUserId : string | null ,partnerUserId : string | null ,productId : string | null ,lastMessage : string | null , reviewValue : number | null ) => {
// const toastPurchaseReview = async  () => {
    await connectDB()
    console.log("currentUserId" + currentUserId , "productId" + productId , "lastMessage" + lastMessage , "reviewValue" + reviewValue )
    try {
        const user : UserType | null = await User.findOne({_id : currentUserId})
        const partnerUser : UserType | null = await User.findOne({_id : partnerUserId})
        const product : ProductType | null = await Product.findById({_id : productId})
        const purchase = {
            userId : partnerUser?._id,
            productId : product?._id,
            productName : product?.productName,
            message : `${user?.username}が商品「${product?.productName}」を評価しました！評価メッセージ ${lastMessage} , 評価 ${reviewValue} `,
            toastCategory : "商品関連",
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