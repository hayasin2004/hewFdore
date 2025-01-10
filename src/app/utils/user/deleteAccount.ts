"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const deleteAccount = async (userId : string |null)=> {
    await connectDB()
    try {
        const deleteUser =await User.findByIdAndDelete(userId)
        console.log(deleteUser)
    }catch (err){
        console.log(err)
        return null
    }
}

export default deleteAccount