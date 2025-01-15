"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment, productCommentType} from "@/models/ProductComment";
import {Product} from "@/models/Product";

const getProductChatMessage = async (currentUserId: string | null, productId: string | null) => {
    await connectDB()
    try {
        const searchProductChat: productCommentType | null = await ProductComment.findOne({productId: productId}).select("listingUserId buyerUserIdList listingChatMessage buyerChatMessage")
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        if (currentUserId == null) {
            console.log("ログインしてからコメントしてください")
            return null
        }
        if (searchProductChat == null) {
            console.log("売り切れか削除されました。")
            return null
        }
        console.log("出品者がコメントしたやつを取得する処理")
        if (searchProductChat) {
            console.log(searchProductChat.listingChatMessage)
            return {
                listingChatMessage: JSON.stringify(searchProductChat.listingChatMessage),
                buyerChatMessage: JSON.stringify(searchProductChat.buyerChatMessage),
                buyerUserIdList: JSON.stringify(searchProductChat.buyerUserIdList),
            }
        }
        return null


    } catch (err) {
        console.log(err)
        return null
    }


}
export default getProductChatMessage;