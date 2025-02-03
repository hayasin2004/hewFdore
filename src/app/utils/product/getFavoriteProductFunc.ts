"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {Purchase} from "@/models/Purchase";
import {Product} from "@/models/Product";

const getFavoriteProductFunc =async (userId : string | null) => {
    await  connectDB()
    try {
        const userData  =await User.findOne({_id :userId}).select("productLikeList");
        console.log(userData);
        if (userData?.productLikeList == false) {
            console.log("いいねした商品はありません")
            return null
        }

        const purchaseProducts: UserType[] = await Promise.all(
            userData.productLikeList.map(async (item : UserType | null) => {
                console.log("購入履歴検索" + item)
                const test = await Product.findById(item);
                return test
            })
        )
        return   JSON.stringify(purchaseProducts)


    }catch (err){
        console.log(err)
        return null
    }
}
export default getFavoriteProductFunc