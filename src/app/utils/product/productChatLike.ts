"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment} from "@/models/ProductComment";

const productChatLike = async (currentUserId: string | null, productId: string | null, commentId: string | null) => {
    await connectDB()
    console.log(currentUserId + "これユーザー")
    try {
        const searchProductAndComment = await ProductComment.findOne({productId: productId})
        if (searchProductAndComment == null) {
            console.log("お探しの商品は売り切れもしくは削除された可能性があります。")
            return null
        } else {
            const searchComment = await searchProductAndComment.buyerChatMessage.id(commentId)
            console.log(searchComment)
            const includesCurrentUserId = searchComment.buyerMessageLike.includes(currentUserId);
            if (includesCurrentUserId) {
                console.log("既にログインしているアカウントでコメントをいいねしている。")
                const updateDeleteSearchMessage = await ProductComment.updateOne(
                    {_id: searchProductAndComment._id, "buyerChatMessage._id": commentId},
                    {$pull: {"buyerChatMessage.$.buyerMessageLike": currentUserId}}
                )
            } else {
                // console.log(searchComment.buyerChatMessage.buyerMessageLike.includes(currentUserId))
                const updateSearchMessage = await ProductComment.updateOne(
                    {_id: searchProductAndComment._id, "buyerChatMessage._id": commentId},
                    {$push: {"buyerChatMessage.$.buyerMessageLike": currentUserId}}
                )
            }
        }
        console.log(searchProductAndComment)
    } catch (err) {
        console.log(err)
        return null
    }
}

export default productChatLike;