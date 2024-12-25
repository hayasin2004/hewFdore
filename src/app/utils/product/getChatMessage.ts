"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment, productCommentType} from "@/models/ProductComment";

const getProductChatMessage = async (currentUserId: string | null, productId: string | null) => {
    await connectDB()
    try {
        const searchProductChat: productCommentType | null = await ProductComment.findOne({productId: productId})
        console.log(searchProductChat)
        if (currentUserId == null) {
            console.log("ログインしてからコメントしてください")
            return null
        }

        if (searchProductChat?.listingUserId == currentUserId) {
                console.log("出品者がコメントしたやつを取得する処理")
            if (searchProductChat?.listingChatMessage !== undefined) {
                const getListingMessage: string | null = searchProductChat?.listingChatMessage
                console.log(getListingMessage)
                return {listingChatMessage: JSON.stringify(getListingMessage)}
            }
        } else {
                console.log("閲覧者がコメントしたやつを取得する処理")
            if (searchProductChat?.buyerChatMessage !== undefined) {
                const getBuyerMessage = searchProductChat?.buyerChatMessage
                console.log(getBuyerMessage)
                return {buyerChatMessage: JSON.stringify(getBuyerMessage)}
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }


}
export default getProductChatMessage;