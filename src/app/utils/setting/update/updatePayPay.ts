"use server"
import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const updatePayPay = async () => {
    await connectDB()
    try {
        const updatePayPayResult  = await Product.updateMany({payPayCode : {$exists : false}},{$set : {payPayCode : ""}})
        //console.log(updatePayPayResult)
    }catch (err){
        console.log(err)
        return null
    }

}
export default updatePayPay