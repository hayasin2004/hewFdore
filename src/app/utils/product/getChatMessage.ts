"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment, productCommentType} from "@/models/ProductComment";
import {Product} from "@/models/Product";

const getProductChatMessage = async (currentUserId: string | null, productId: string | null) => {
    await connectDB()
    try {
        const searchProductChat: productCommentType | null = await ProductComment.findOne({productId: productId})
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")

        if (currentUserId == null) {
            console.log("ログインしてからコメントしてください")
            return null
        }

        if (productListingUser.sellerId == currentUserId) {
                console.log("出品者がコメントしたやつを取得する処理")
            if (searchProductChat?.listingChatMessage !== undefined) {
                const getListingMessage: string | null = searchProductChat?.listingChatMessage
                console.log(getListingMessage)
                return {listingChatMessage: JSON.stringify(getListingMessage)}
            }
            return  null
        } else {
                console.log("閲覧者がコメントしたやつを取得する処理")
            if (searchProductChat?.ChatMessage !== undefined) {
                const getBuyerMessage = searchProductChat?.listingChatMessage
                console.log(getBuyerMessage)
                return {chatMessage: JSON.stringify(getBuyerMessage)}
            }
            return  null

        }
    } catch (err) {
        console.log(err)
        return null
    }


}
export default getProductChatMessage;