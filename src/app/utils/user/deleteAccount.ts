"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Stripe} from "stripe";　
import sellerCheck from "@/app/utils/product/sellerCheck";
import {UserType} from "@/app/api/user/catchUser/route";
import {Purchase} from "@/models/Purchase";
import {ProductType} from "@/app/utils/product/productDetail";
import { Product } from "@/models/Product";

const deleteAccount = async (userId: string | null) => {
    await connectDB()
    try {
        const deleteProduct = await Product.find({sellerId: userId});
        const listingProducts = await Promise.all(
            deleteProduct.map(async (item : ProductType) => {
                const deleteProductComplete = await Product.findByIdAndDelete(item._id);
                console.log(deleteProductComplete)
            })
        )
        const deleteUser = await User.findByIdAndDelete(userId)
        console.log(listingProducts ,deleteUser)
        return {status: "delete" }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default deleteAccount