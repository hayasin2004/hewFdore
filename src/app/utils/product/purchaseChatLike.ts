"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";

const purchaseChatLike = async (currentUserId: string | null, purchaseId: string | null, commentId: string | null) => {
    await connectDB()
    try {
        const checkSellerUser = await Purchase.findOne({_id: purchaseId}).select("sellerId")
        const searchSellerPurchaseAndComment = await Purchase.findOne({"sellerChatMessage._id": commentId}, {"sellerChatMessage.$": 1})
        const searchBuyerPurchaseAndComment = await Purchase.findOne({"buyerChatMessage._id": commentId}, {"buyerChatMessage.$": 1})
        // console.log("判定" + searchSellerPurchaseAndComment.sellerChatMessage[0]?.sellerUserId == currentUserId )

        if (searchBuyerPurchaseAndComment?.buyerChatMessage[0]?.buyerUserId == currentUserId) {
            console.log("[購入者]自分のコメントにはいいねで来ません。")
            return null
        } else if (searchSellerPurchaseAndComment?.sellerChatMessage[0]?.sellerUserId == currentUserId) {
            console.log("[出品者]自分のコメントにはいいねで来ません。")
            return null
        } else {

            if (searchSellerPurchaseAndComment == null && searchBuyerPurchaseAndComment == null) {
                console.log("コメントが削除されている可能性があります")
                return null
            } else {
                // searchBuyerPurchaseAndComment == null && searchSellerPurchaseAndComment !== null
                // これは購入者のコメントがクエリしてnullが返ってきた場合と出品者のコメントをクエリしたときに見つかったときの論理積
                if (searchBuyerPurchaseAndComment == null && searchSellerPurchaseAndComment !== null) {　
                    const includesCurrentUserId = searchSellerPurchaseAndComment?.sellerChatMessage[0]?.sellerMessageLike.includes(currentUserId);
                    // console.log("ここにいる" + searchSellerPurchaseAndComment?.sellerChatMessage[0]?.sellerMessageLike.includes(currentUserId));
                    if (includesCurrentUserId) {
                        console.log("既にログインしているアカウントで出品者のコメントをいいねしている。")
                        console.log("出品者のコメントに対するいいねを削除します。")
                        const updateDeleteSearchMessage = await Purchase.updateOne(
                            {_id: searchSellerPurchaseAndComment?._id, "sellerChatMessage._id": commentId},
                            {$pull: {"sellerChatMessage.$.sellerMessageLike": currentUserId}},{new :true}
                        )
                        return {likeStatus : "delete" , productLike : updateDeleteSearchMessage}

                    } else {
                        console.log("ログインしているアカウントで出品者のコメントをいいねしていないので新規いいね。")
                        // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
                        const updateSearchMessage = await Purchase.updateOne(
                            {_id: searchSellerPurchaseAndComment._id, "sellerChatMessage._id": commentId},
                            {$push: {"sellerChatMessage.$.sellerMessageLike": currentUserId}},{new :true}
                        )
                        return {likeStatus : "insert" , productLike : updateSearchMessage}

                    }
                } else if (searchBuyerPurchaseAndComment !== null && searchSellerPurchaseAndComment == null) {
                    // searchBuyerPurchaseAndComment !== null && searchSellerPurchaseAndComment == null
                    // これは出品者のコメントがクエリしてnullが返ってきた場合と購入者のコメントをクエリしたときに見つかったときの論理積
                    console.log("購入者コメントに対するいいね")

                    const includesCurrentUserId = searchBuyerPurchaseAndComment?.buyerChatMessage[0]?.buyerMessageLike.includes(currentUserId);

                    if (includesCurrentUserId) {
                        console.log("既にログインしているアカウントで購入者のコメントをいいねしている。")
                        console.log("購入者のコメントに対するいいねを削除します。")
                        
                        const updateDeleteSearchMessage = await Purchase.updateOne(
                            {_id: searchBuyerPurchaseAndComment._id, "buyerChatMessage._id": commentId},
                            {$pull: {"buyerChatMessage.$.buyerMessageLike": currentUserId}},{new :true}
                        )

                        return {likeStatus : "delete" , productLike : updateDeleteSearchMessage}

                    } else {
                        console.log("ログインしているアカウントで購入者のコメントをいいねしていないので新規いいね。")

                        // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
                        const updateSearchMessage = await Purchase.updateOne(
                            {_id: searchBuyerPurchaseAndComment._id, "buyerChatMessage._id": commentId},
                            {$push: {"buyerChatMessage.$.buyerMessageLike": currentUserId}},{new :true}
                        )

                        return {likeStatus : "insert"  , productLike : updateSearchMessage}

                    }
                }
                console.log(searchBuyerPurchaseAndComment)
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default purchaseChatLike;
