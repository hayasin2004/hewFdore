"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";

const purchaseChatLike = async (currentUserId: string | null, purchaseId: string | null, commentId: string | null) => {
    await connectDB()
    try {
        const checkListingUser = await Purchase.findOne({_id: purchaseId}).select("sellerId")
        const searchListingPurchaseAndComment = await Purchase.findOne({"sellerChatMessage._id": commentId}, {"sellerChatMessage.$": 1})
        const searchBuyerPurchaseAndComment = await Purchase.findOne({"buyerChatMessage._id": commentId}, {"buyerChatMessage.$": 1})
        console.log("判定" + searchBuyerPurchaseAndComment?.buyerChatMessage[0]?.buyerUserId == currentUserId)
        // if (searchBuyerPurchaseAndComment?.buyerChatMessage[0]?.buyerUserId == currentUserId) {
        //     console.log("自分のコメントにはいいねで来ません。")
        //     return null
        // } else if (searchListingPurchaseAndComment?.listingChatMessage[0]?.senderUserId == currentUserId) {
        //     console.log("自分のコメントにはいいねで来ません。")
        //     return null
        // } else {
        //
        //     if (searchListingPurchaseAndComment == null && searchBuyerPurchaseAndComment == null) {
        //         console.log("いいね" + searchListingPurchaseAndComment?.sellerChatMessage[0]?.sellerMessageLike)
        //         const includesCurrentUserId = searchListingPurchaseAndComment?.sellerChatMessage[0]?.sellerMessageLike.includes(currentUserId);
        //         // console.log("ここにいる" + searchListingPurchaseAndComment?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId));
        //         if (includesCurrentUserId) {
        //             console.log("既にログインしているアカウントでコメントをいいねしている。")
        //             const updateDeleteSearchMessage = await Purchase.updateOne(
        //                 {_id: searchListingPurchaseAndComment?._id, "sellerChatMessage._id": commentId},
        //                 {$pull: {"sellerChatMessage.$.sellerMessageLike": currentUserId}}
        //             )
        //             console.log(updateDeleteSearchMessage)
        //         } else {
        //             // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
        //             const updateSearchMessage = await Purchase.updateOne(
        //                 {_id: searchListingPurchaseAndComment?._id, "sellerChatMessage._id": commentId},
        //                 {$push: {"sellerChatMessage.$.sellerMessageLike": currentUserId}}
        //             )
        //             console.log(updateSearchMessage)
        //         }
        //         return null
        //     } else {
        //         if (searchBuyerPurchaseAndComment == null && searchListingPurchaseAndComment !== null) {
        //
        //             const includesCurrentUserId = searchListingPurchaseAndComment?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId);
        //             // console.log("ここにいる" + searchListingPurchaseAndComment?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId));
        //             if (includesCurrentUserId) {
        //                 console.log("既にログインしているアカウントでコメントをいいねしている。")
        //                 const updateDeleteSearchMessage = await Purchase.updateOne(
        //                     {_id: searchListingPurchaseAndComment?._id, "listingChatMessage._id": commentId},
        //                     {$pull: {"listingChatMessage.$.listingMessageLike": currentUserId}}
        //                 )
        //             } else {
        //                 // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
        //                 const updateSearchMessage = await Purchase.updateOne(
        //                     {_id: searchListingPurchaseAndComment._id, "listingChatMessage._id": commentId},
        //                     {$push: {"listingChatMessage.$.listingMessageLike": currentUserId}}
        //                 )
        //             }
        //         } else if (searchBuyerPurchaseAndComment !== null && searchListingPurchaseAndComment == null) {
        //             const includesCurrentUserId = searchBuyerPurchaseAndComment?.buyerChatMessage[0]?.buyerMessageLike.includes(currentUserId);
        //
        //             if (includesCurrentUserId) {
        //                 console.log("既にログインしているアカウントでコメントをいいねしている。")
        //                 const updateDeleteSearchMessage = await Purchase.updateOne(
        //                     {_id: searchBuyerPurchaseAndComment._id, "buyerChatMessage._id": commentId},
        //                     {$pull: {"buyerChatMessage.$.buyerMessageLike": currentUserId}}
        //                 )
        //             } else {
        //             console.log("デバック用ここまで来た")
        //                 // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
        //                 const updateSearchMessage = await Purchase.updateOne(
        //                     {_id: searchBuyerPurchaseAndComment._id, "buyerChatMessage._id": commentId},
        //                     {$push: {"buyerChatMessage.$.buyerMessageLike": currentUserId}}
        //                 )
        //             }
        //         }
        //         console.log(searchBuyerPurchaseAndComment)
        //     }
        // }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default purchaseChatLike;
