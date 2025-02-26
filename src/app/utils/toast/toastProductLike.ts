"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Toast} from "@/models/Toast";
import {UserType} from "@/app/api/user/catchUser/route";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

const toastFollowings = async (productId:string | ProductType | null , sellerId: string | null , likedUserId : string | null  ) => {
    await connectDB()
    try {
        const product : ProductType | null = await Product.findById(productId);
        const sellerUser : UserType | null = await User.findById(sellerId);
        const likedUserUser : UserType | null = await User.findById(likedUserId);
        const purchase = {
            userId : sellerId,
            likedUserId : likedUserId,
            productId : productId,
            productName : product?.productName,
            message : `${likedUserUser?.username}があなたの商品${product?.productName}をいいねしました。`,
            toastCategory : "商品関連",
            alreadyRead : "未読",
        }
        const toastFollow = await  Toast.create(purchase)
        console.log(sellerUser , toastFollow)
        }catch (err){
        console.log(err)
        return null
    }

}

export default toastFollowings;