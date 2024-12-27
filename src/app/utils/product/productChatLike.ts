"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment} from "@/models/ProductComment";
import {Product} from "@/models/Product";

const productChatLike = async (currentUserId: string | null, productId: string | null, commentId: string | null) => {
    await connectDB()
    try {
        const checkListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const searchListingProductAndComment = await ProductComment.findOne({"listingChatMessage._id": commentId}, {"listingChatMessage.$": 1})
        const searchBuyerProductAndComment = await ProductComment.findOne({"buyerChatMessage._id": commentId}, {"buyerChatMessage.$": 1})

        if (searchBuyerProductAndComment?.buyerChatMessage[0]?.senderUserId == currentUserId) {
            console.log("自分のコメントにはいいねで来ません。")
            return null
        } else if (searchListingProductAndComment?.listingChatMessage[0]?.senderUserId == currentUserId) {
            console.log("自分のコメントにはいいねで来ません。")
            return null
        } else {

            if (searchListingProductAndComment == null && searchBuyerProductAndComment == null) {
                console.log("お探しの商品は売り切れもしくは削除された可能性があります。")
                return null
            } else {
                if (searchBuyerProductAndComment == null && searchListingProductAndComment !== null) {

                    const includesCurrentUserId = searchListingProductAndComment?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId);
                    // console.log("ここにいる" + searchListingProductAndComment?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId));
                    if (includesCurrentUserId) {
                        console.log("既にログインしているアカウントでコメントをいいねしている。")
                        const updateDeleteSearchMessage = await ProductComment.updateOne(
                            {_id: searchListingProductAndComment._id, "listingChatMessage._id": commentId},
                            {$pull: {"listingChatMessage.$.listingMessageLike": currentUserId}}
                        )
                    } else {
                        // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
                        const updateSearchMessage = await ProductComment.updateOne(
                            {_id: searchListingProductAndComment._id, "listingChatMessage._id": commentId},
                            {$push: {"listingChatMessage.$.listingMessageLike": currentUserId}}
                        )
                    }
                } else if (searchBuyerProductAndComment !== null && searchListingProductAndComment == null) {
                    const includesCurrentUserId = searchBuyerProductAndComment?.buyerChatMessage[0]?.buyerMessageLike.includes(currentUserId);

                    if (includesCurrentUserId) {
                        console.log("既にログインしているアカウントでコメントをいいねしている。")
                        const updateDeleteSearchMessage = await ProductComment.updateOne(
                            {_id: searchBuyerProductAndComment._id, "buyerChatMessage._id": commentId},
                            {$pull: {"buyerChatMessage.$.buyerMessageLike": currentUserId}}
                        )
                    } else {
                        // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
                        const updateSearchMessage = await ProductComment.updateOne(
                            {_id: searchBuyerProductAndComment._id, "buyerChatMessage._id": commentId},
                            {$push: {"buyerChatMessage.$.buyerMessageLike": currentUserId}}
                        )
                    }
                }
                console.log(searchBuyerProductAndComment)
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default productChatLike;
