"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment} from "@/models/ProductComment";
import {Product} from "@/models/Product";

const productChatLike = async (currentUserId: string | null, productId: string | null, commentId: string | null, icon: string | null) => {
    await connectDB()
    try {
        console.log(icon)
        const checkListingUser = await Product.findOne({_id: productId}).select("sellerId")
        console.log("デバック用コメント" + commentId)
        const searchListingProductAndComment = await ProductComment.findOne({"productChat.listingChatMessage._id": commentId}, {"productChat.$": 1})
        const searchBuyerProductAndComment = await ProductComment.findOne({"productChat.buyerChatMessage._id": commentId}, {"productChat.$": 1})

        if (searchBuyerProductAndComment?.productChat[0]?.buyerChatMessage[0]?.senderUserId == currentUserId) {
            console.log("自分のコメントにはいいねで来ません。")
            return null
        } else if (searchListingProductAndComment?.productChat[0]?.listingChatMessage[0]?.senderUserId == currentUserId) {
            console.log("自分のコメントにはいいねで来ません。")
            return null
        } else {

            if (searchListingProductAndComment == null && searchBuyerProductAndComment == null) {
                console.log("お探しの商品は売り切れもしくは削除された可能性があります。")
                console.log(searchBuyerProductAndComment, searchBuyerProductAndComment)
                return null
            } else {
                if (searchBuyerProductAndComment == null && searchListingProductAndComment !== null) {

                    const includesCurrentUserId = searchListingProductAndComment?.productChat[0]?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId);
                    // console.log("ここにいる" + searchListingProductAndComment?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId));
                    if (includesCurrentUserId) {
                        console.log("出品者既にログインしているアカウントでコメントをいいねしている。")
                        // const updateDeleteSearchMessage = await ProductComment.updateOne(
                        //     {
                        //         _id: searchListingProductAndComment._id,
                        //         "productChat.listingChatMessage._id": commentId
                        //     },
                        //     {
                        //         $pull: {
                        //             "productChat.$.listingChatMessage.$.buyerMessageLike": currentUserId,
                        //             "productChat.$.listingChatMessage.$.buyerMessageStamp": {
                        //                 userId: currentUserId,
                        //                 listingMessageStampLike: icon
                        //             }
                        //         }
                        //     }
                        // )
                        const updateMessageLike = await ProductComment.updateOne(
                            {
                                _id: searchListingProductAndComment._id,
                                "productChat.listingChatMessage._id": commentId
                            },
                            {
                                $pull: {"productChat.$[i].listingChatMessage.$[j].listingMessageLike": currentUserId}
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchListingProductAndComment.productChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        );
                        const updateMessageStamp = await ProductComment.updateOne(
                            {_id: searchListingProductAndComment._id, "productChat.listingChatMessage._id": commentId},
                            {
                                $pull: {
                                    "productChat.$[i].listingChatMessage.$[j].listingMessageStamp": {
                                        userId: currentUserId,
                                        listingMessageStampLike: icon
                                    }
                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchListingProductAndComment.productChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        );
                    } else {
                        console.log("kokonikitehosii1/25")
                        // console.log(searchComment.ChatMessage.buyerMessageLike.includes(currentUserId))
                        // const updateSearchMessage = await ProductComment.updateOne(
                        //     {
                        //         _id: searchListingProductAndComment._id,
                        //         "productChat.listingChatMessage._id": commentId
                        //     },
                        //     {
                        //         $push: {
                        //             "productChat.listingChatMessage.$.listingMessageLike": currentUserId,
                        //             "productChat.listingChatMessage.$.listingMessageStamp": {
                        //                 userId: currentUserId,
                        //                 listingMessageStampLike: icon
                        //             }
                        //         }
                        //     }
                        // )
                        const updateMessageLike = await ProductComment.updateOne(
                            {
                                _id: searchListingProductAndComment._id,
                                "productChat.listingChatMessage._id": commentId
                            },
                            {
                                $push: {"productChat.$[i].listingChatMessage.$[j].listingMessageLike": currentUserId}
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchListingProductAndComment.productChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        );
                        const updateMessageStamp = await ProductComment.updateOne(
                            {_id: searchListingProductAndComment._id, "productChat.listingChatMessage._id": commentId},
                            {
                                $push: {
                                    "productChat.$[i].listingChatMessage.$[j].listingMessageStamp": {
                                        userId: currentUserId,
                                        listingMessageStampLike: icon
                                    }
                                }
                            },
                            {
                                arrayFilters: [
                                    {"i._id": searchListingProductAndComment.productChat[0]._id},
                                    {"j._id": commentId}
                                ]
                            }
                        );


                    }
                } else if (searchBuyerProductAndComment !== null && searchListingProductAndComment == null) {
                    const includesCurrentUserId = searchBuyerProductAndComment?.productChat[0]?.buyerChatMessage[0]?.buyerMessageLike.includes(currentUserId);

                    if (includesCurrentUserId) {
                        console.log("購入者コメント既にログインしているアカウントでコメントをいいねしている。")

                        const updateDeleteSearchMessage = await ProductComment.updateOne(
                            {_id: searchBuyerProductAndComment._id, "productChat.buyerChatMessage._id": commentId},
                            {
                                $pull: {
                                    "productChat.$.buyerChatMessage.$.buyerMessageLike": currentUserId,
                                    "productChat.$.buyerChatMessage.$.buyerMessageStamp": {
                                        userId: currentUserId,
                                        buyerMessageStampLike: icon
                                    }
                                }
                            }
                        )
                    } else {
                        const updateSearchMessage = await ProductComment.updateOne(
                            {_id: searchBuyerProductAndComment._id, "productChat.buyerChatMessage._id": commentId},
                            {
                                $push: {
                                    "productChat.$.buyerChatMessage.$.buyerMessageLike": currentUserId,
                                    "productChat.$.buyerChatMessage.$.buyerMessageStamp": {
                                        userId: currentUserId,
                                        buyerMessageStampLike: icon
                                    }
                                }
                            }
                        )
                    }
                }
                console.log("これが塗る？" + searchListingProductAndComment)
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default productChatLike;
