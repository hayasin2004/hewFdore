"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";

const purchaseChatLike = async (currentUserId: string | null, purchaseId: string | null, commentId: string | null, icon: string | null) => {
    await connectDB()
    try {
         const searchSellerPurchaseAndComment = await Purchase.findOne({"tradeChat.sellerChatMessage._id": commentId}, {"tradeChat.$": 1})
        const searchBuyerPurchaseAndComment = await Purchase.findOne({"tradeChat.buyerChatMessage._id": commentId}, {"tradeChat.$": 1})
        console.log("判定" + commentId)

        if (searchBuyerPurchaseAndComment?.tradeChat[0]?.buyerChatMessage[0]?.buyerUserId == currentUserId) {

            return null
        } else if (searchSellerPurchaseAndComment?.tradeChat[0]?.sellerChatMessage[0]?.sellerUserId == currentUserId) {
            console.log("[出品者]自分のコメントにはいいねで来ません。")
            return null
        } else {

            if (searchSellerPurchaseAndComment == null && searchBuyerPurchaseAndComment == null) {
                console.log("コメントが削除されている可能性があります")
                return null
            } else {
                  if (searchBuyerPurchaseAndComment == null && searchSellerPurchaseAndComment !== null) {
                    const includesCurrentUserId = searchSellerPurchaseAndComment?.tradeChat[0]?.sellerChatMessage[0]?.sellerMessageLike.includes(currentUserId);
                      if (includesCurrentUserId) {
                        console.log("既にログインしているアカウントで出品者のコメントをいいねしている。")
                        console.log("出品者のコメントに対するいいねを削除します。")
                        const updateDeleteSearchMessage = await Purchase.updateOne(
                            {_id: searchSellerPurchaseAndComment?._id, "tradeChat.sellerChatMessage._id": commentId},
                            {
                                $pull: {
                                    "tradeChat.$[i].sellerChatMessage.$[j].sellerMessageLike": currentUserId,
                                    "sellerChatMessage.$.sellerMessageStamp": {
                                        userId: currentUserId,
                                        sellerMessageStampLike: icon
                                    }
                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchSellerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            },
                        )

                        const updateMessageStamp = await Purchase.updateOne(
                            {_id: searchSellerPurchaseAndComment?._id, "tradeChat.sellerChatMessage._id": commentId},
                            {
                                $pull: {
                                    "tradeChat.$[i].sellerChatMessage.$[j].sellerMessageStamp": {
                                        userId: currentUserId,
                                        sellerMessageStampLike: icon
                                    },

                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchSellerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        )
                        return {likeStatus: "delte", productLike: updateDeleteSearchMessage ,productLikeStamp : updateMessageStamp }

                    } else {
                        console.log("ログインしているアカウントで出品者のコメントをいいねしていないので新規いいね。")
                         const updateInsertSearchMessage = await Purchase.updateOne(
                            {_id: searchSellerPurchaseAndComment?._id, "tradeChat.sellerChatMessage._id": commentId},
                            {
                                $push: {
                                    "tradeChat.$[i].sellerChatMessage.$[j].sellerMessageLike": currentUserId,
                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchSellerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            },
                        )

                        const updateMessageStamp = await Purchase.updateOne(
                            {_id: searchSellerPurchaseAndComment?._id, "tradeChat.sellerChatMessage._id": commentId},
                            {
                                $push: {
                                    "tradeChat.$[i].sellerChatMessage.$[j].sellerMessageStamp": {
                                        userId: currentUserId,
                                        sellerMessageStampLike: icon
                                    },

                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchSellerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        )
                        return {likeStatus: "insert", productLike: updateInsertSearchMessage ,productLikeStamp : updateMessageStamp }

                    }
                } else if (searchBuyerPurchaseAndComment !== null && searchSellerPurchaseAndComment == null) {
                     console.log("購入者コメントに対するいいね")

                    const includesCurrentUserId = searchBuyerPurchaseAndComment?.tradeChat[0]?.buyerChatMessage[0]?.buyerMessageLike.includes(currentUserId);

                    if (includesCurrentUserId) {
                        console.log("既にログインしているアカウントで購入者のコメントをいいねしている。")
                        console.log("購入者のコメントに対するいいねを削除します。")



                        const updateInsertSearchMessage = await Purchase.updateOne(
                            {_id: searchBuyerPurchaseAndComment?._id, "tradeChat.buyerChatMessage._id": commentId},
                            {
                                $pull: {
                                    "tradeChat.$[i].buyerChatMessage.$[j].buyerMessageLike": currentUserId,
                                    "buyerChatMessage.$.buyerMessageStamp": {
                                        userId: currentUserId,
                                        buyerMessageStampLike: icon
                                    }
                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchBuyerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            },
                        )

                        const updateMessageStamp = await Purchase.updateOne(
                            {_id: searchBuyerPurchaseAndComment?._id, "tradeChat.buyerChatMessage._id": commentId},
                            {
                                $pull: {
                                    "tradeChat.$[i].buyerChatMessage.$[j].buyerMessageStamp": {
                                        userId: currentUserId,
                                        buyerMessageStampLike: icon
                                    },

                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchBuyerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        )

                        return {likeStatus: "insert", productLike: updateInsertSearchMessage ,productLikeStamp : updateMessageStamp }
                    } else {
                        console.log("ログインしているアカウントで購入者のコメントをいいねしていないので新規いいね。")


                        const updateDeleteSearchMessage = await Purchase.updateOne(
                            {_id: searchBuyerPurchaseAndComment?._id, "tradeChat.buyerChatMessage._id": commentId},
                            {
                                $push: {
                                    "tradeChat.$[i].buyerChatMessage.$[j].buyerMessageLike": currentUserId,
                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchBuyerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            },
                        )

                        const updateMessageStamp = await Purchase.updateOne(
                            {_id: searchBuyerPurchaseAndComment?._id, "tradeChat.buyerChatMessage._id": commentId},
                            {
                                $push: {
                                    "tradeChat.$[i].buyerChatMessage.$[j].buyerMessageStamp": {
                                        userId: currentUserId,
                                        buyerMessageStampLike: icon
                                    },

                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchBuyerPurchaseAndComment.tradeChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        )


                        return {likeStatus: "delete", productLike: updateDeleteSearchMessage ,productLikeStamp : updateMessageStamp }

                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default purchaseChatLike;
