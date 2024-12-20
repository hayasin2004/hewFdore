"use server"
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {ProductChatMessage} from "@/models/ProductChatMessage";
import {ProductType} from "@/app/utils/product/productDetail";
import {UserType} from "@/app/api/user/catchUser/route";

const SaveChatMessage = async (productId: string | null, currentUserId: string | null) => {
    await connectDB()
    try {
    console.log("ここまで来た")
        const product:ProductType| null  = await Product.findById(productId);
        const currentUser:UserType | null  = await User.findById(currentUserId);
        const productChatMessageSession:string | null  = await ProductChatMessage.findOne({listingUser :product?.sellerId});
        if ( productChatMessageSession == null && currentUserId !== null) {
            const NewProductChatMessageSession = await ProductChatMessage.create({ChatMessageUsers:currentUserId , productId:productId ,listingUser:product?.sellerId ,  })
            await NewProductChatMessageSession.save()
            console.log(NewProductChatMessageSession)
        }
        // console.log("これころえろえ"+product,"これユーザーこれユーザーこれユーザー" +  currentUser)
        return null
    } catch (err) {
        console.log(err)
    }
}

export default SaveChatMessage