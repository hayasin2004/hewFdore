"use server"
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {ProductChatMessage, ProductChatMessageType} from "@/models/ProductChatMessage";
import {ProductType} from "@/app/utils/product/productDetail";
import {UserType} from "@/app/api/user/catchUser/route";
import {ByBuyerProductChatMessage} from "@/models/ByBuyerProductChatMessage";

const CreateChatMessageRoom = async (productId: string | null, currentUserId: string | null):Promise<string | null> => {
    await connectDB()
    try {
    console.log("ここまで来た")
        const product:ProductType| null  = await Product.findById(productId);
        const currentUser:UserType | null  = await User.findById(currentUserId);
        const productChatMessageSession:ProductChatMessageType | null  = await ProductChatMessage.findOne({productId :productId});
        if (productChatMessageSession !== null) {
            console.log("すでにこの商品のチャット部屋は作成されています。")
            return JSON.stringify(productChatMessageSession._id)
        }
        if ( product!==null && productChatMessageSession == null && currentUserId !== null) {

            const NewProductChatMessageSession = await ProductChatMessage.create({otherUser:currentUserId , productId:productId ,listingUser:product?.sellerId})

            await NewProductChatMessageSession.save()
            console.log(NewProductChatMessageSession)
            return JSON.stringify(NewProductChatMessageSession._id)
        }
        // console.log("これころえろえ"+product,"これユーザーこれユーザーこれユーザー" +  currentUser)
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}

export default CreateChatMessageRoom