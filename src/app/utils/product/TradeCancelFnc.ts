"use server"

import {connectDB} from "@/lib/mongodb";

const TradeCancelFnc = async (stripeCode :string | null) =>{
    await  connectDB()
    try {

    }catch (err){
        console.log(err)
        return null
    }
}
export default TradeCancelFnc