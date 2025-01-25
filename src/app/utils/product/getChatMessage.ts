"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment, productCommentType} from "@/models/ProductComment";
import {Product} from "@/models/Product";

const getProductChatMessage = async (currentUserId: string | null, productId: string | null) => {
    await connectDB()
    try {
        const searchProductChat: productCommentType | null = await ProductComment.findOne({productId: productId}).select(" listingUserId buyerUserIdList  productChat")
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        if (currentUserId == null) {
            console.log("ログインしてからコメントしてください")
            return null
        }
        if (searchProductChat == null) {
            console.log("売り切れか削除されました。")
            return null
        }
        if (searchProductChat) {
            console.log("1/25出品者がコメントしたやつを取得する処理")
            console.log(searchProductChat)
            return {
                listingChatMessage: JSON.stringify(searchProductChat.productChat),
                buyerChatMessage: JSON.stringify(searchProductChat.productChat[0]?.buyerChatMessage),
                buyerUserIdList: JSON.stringify(searchProductChat.productChat[0]?.buyerUserIdList),
            }
        }
        return null


    } catch (err) {
        console.log(err)
        return null
    }


}
export default getProductChatMessage;