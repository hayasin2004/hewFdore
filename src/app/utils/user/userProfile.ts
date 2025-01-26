"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";

const userProfile = async (id: UserType | null) => {
    await connectDB()
    //console.log("ユーザー特定したい" + id)
    try {
        const searchUser: UserType | null = await User.findOne({_id: id})
        const searchProduct: ProductType[] | null = await Product.find({sellerId: id})
        // //console.log(searchProduct)
        return {
            searchUser: JSON.stringify(searchUser), searchProduct : JSON.stringify(searchProduct)
        }

    } catch
        (err) {
        //console.log(err)
        return null
    }


}

export default userProfile