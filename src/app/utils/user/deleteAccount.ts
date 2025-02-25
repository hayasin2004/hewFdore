"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Product} from "@/models/Product";

const deleteAccount = async (userId : string |null)=> {
    await connectDB()
    try {
        const deleteProduct  = await  Product.findOne({sellerId : userId});
        console.log(deleteProduct)
        const deleteUser =await User.findByIdAndDelete(userId)
        console.log(deleteUser)
        return {status : "delete"}
    }catch (err){
        console.log(err)
        return null
    }
}

export default deleteAccount