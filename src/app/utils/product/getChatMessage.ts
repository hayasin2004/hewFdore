"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment, ProductCommentType} from "@/models/ProductComment";
const getProductChatMessage = async ( productId: string | null) => {
    await connectDB()
    console.log("そもそも動いてんのかって話")
    try {
        const searchProductChat = await ProductComment.findOne({productId: productId}).select(" listingUserId buyerUserIdList productChat")
        if (searchProductChat == null) {
            console.log("売り切れか削除されました。")
            return null
        }
        if (searchProductChat) {
            console.log("1/25出品者がコメントしたやつを取得する処理")
            return {
                listingChatMessage: JSON.stringify(searchProductChat.productChat),
                buyerChatMessage: JSON.stringify(searchProductChat?.productChat[0]?.buyerChatMessage),
            }
        }
        return null


    } catch (err) {
        console.log(err)
        return null
    }


}
export default getProductChatMessage;