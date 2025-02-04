"use server"

import {connectDB} from "@/lib/mongodb";
import {Toast} from "@/models/Toast";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

const toastPurchase = async  (currentUserId : string | null ,productId : string | null ,purchaseId : string | null ) => {

    await connectDB()
    try {
        const user : UserType | null = await User.findOne({_id : currentUserId})
        const product : ProductType | null = await Product.findById({_id : productId})
        const purchase = {
            userId : user?._id,
            productId : product?._id,
            productName : product?.productName,
            message : `商品「${product?.productName}」が購入されました！`,
            toastCategory : "商品関連",
            alreadyRead : "未読",
            tradeId : purchaseId,
        }

        const toastPurchase  = await Toast.create(purchase)
        await toastPurchase.save()


    }catch (err){
        console.log(err)
        return null
    }
}
export default toastPurchase;