"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast} from "@/models/Toast";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

// 通知を追加する機能
// const toastPurchase = async  (currentUserId : string | null ,productId : string | null ,purchaseId : string | null ) => {
const toastPurchase = async  () => {
    await connectDB()
    try {
        const user : UserType | null = await User.findOne({_id : "66dd839b7f87e2981ba6c7a0"})
        const product : ProductType | null = await Product.findById({_id : "67821092541a4b20dd7447ff"})
        const purchase = {
            userId : user?._id,
            productId : product?._id,
            productName : product?.productName,
            message : `商品「${product?.productName}」が購入されました！`,
            toastCategory : "商品関連",
            alreadyRead : "未読",
        }

        const toastPurchase = await Toast.create(purchase)
        await toastPurchase.save()


    }catch (err){
        //console.log(err)
        return null
    }
}
export default toastPurchase;