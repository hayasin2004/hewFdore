"use server"

import {connectDB} from "@/lib/mongodb";
import {ProductComment} from "@/models/ProductComment";

const productChatLike = async (currentUserId: string | undefined, productId:string | undefined, commentId:string | undefined, icon: string | null) => {
    await connectDB()
    try {　
        const searchListingProductAndComment = await ProductComment.findOne({"productChat.listingChatMessage._id": commentId}, {"productChat.$": 1})
        const searchBuyerProductAndComment = await ProductComment.findOne({"productChat.buyerChatMessage._id": commentId}, {"productChat.$": 1})
        console.log(currentUserId, productId, commentId, icon)

        console.log("ここにいる" + searchBuyerProductAndComment !== null && searchListingProductAndComment == undefined && searchListingProductAndComment == null);
        console.log("ここにいる");
        if (searchBuyerProductAndComment?.productChat[0]?.buyerChatMessage[0]?.senderUserId == currentUserId) {
            console.log("自分のコメントにはいいねで来ません。")
            return null
        } else if (searchListingProductAndComment?.productChat[0]?.listingChatMessage[0]?.senderUserId == currentUserId) {
            console.log("自分のコメントにはいいねで来ません。")
            return null
        }
        if (searchListingProductAndComment == null && searchBuyerProductAndComment == null) {
            console.log("お探しの商品は売り切れもしくは削除された可能性があります。")

            return null
        } else {
            if (searchBuyerProductAndComment == null && searchBuyerProductAndComment == undefined && searchListingProductAndComment !== null) {
                const includesCurrentUserId = searchListingProductAndComment?.productChat[0]?.listingChatMessage[0]?.listingMessageLike.includes(currentUserId);
                if (includesCurrentUserId) {
                    console.log("出品者既にログインしているアカウントでコメントをいいねしている。")

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
                    console.log(updateMessageLike , updateMessageStamp)
                } else {
                    console.log("デバック用コメント4")

                    console.log("kokonikitehosii1/25")

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

                    console.log(updateMessageLike , updateMessageStamp)

                }
            }
            if (searchBuyerProductAndComment !== null && searchListingProductAndComment == undefined && searchListingProductAndComment == null) {

                const includesCurrentUserId = searchBuyerProductAndComment?.productChat[0]?.buyerChatMessage[0]?.buyerMessageLike.includes(currentUserId);

                if (includesCurrentUserId) {　
                    console.log("購入者コメント既にログインしているアカウントでコメントをいいねしている。")

                    const updateMessageLike = await ProductComment.updateOne(
                        {
                            _id: searchBuyerProductAndComment._id,
                            "productChat.buyerChatMessage._id": commentId
                        },
                        {
                            $pull: {"productChat.$[i].buyerChatMessage.$[j].buyerMessageLike": currentUserId}
                        },
                        {
                            arrayFilters: [
                                {"i._id": searchBuyerProductAndComment.productChat[0]._id},
                                {"j._id": commentId}
                            ]
                        }
                    );
                    const updateMessageStamp = await ProductComment.updateOne(
                        {_id: searchBuyerProductAndComment._id, "productChat.buyerChatMessage._id": commentId},
                        {
                            $pull: {
                                "productChat.$[i].buyerChatMessage.$[j].buyerMessageStamp": {
                                    userId: currentUserId,
                                    buyerMessageStampLike: icon
                                }
                            }
                        },
                        {
                            arrayFilters: [
                                {"i._id": searchBuyerProductAndComment.productChat[0]._id},
                                {"j._id": commentId}
                            ]
                        }
                    );
                    console.log(updateMessageLike , updateMessageStamp)

                } else {
                    console.log("購入者コメント コメントをいいねしていない。")

                    const updateMessageLike = await ProductComment.updateOne(
                        {
                            _id: searchBuyerProductAndComment._id,
                            "productChat.buyerChatMessage._id": commentId
                        },
                        {
                            $push: {"productChat.$[i].buyerChatMessage.$[j].buyerMessageLike": currentUserId}
                        },
                        {
                            arrayFilters: [
                                {"i._id": searchBuyerProductAndComment.productChat[0]._id},
                                {"j._id": commentId}
                            ]
                        }
                    );
                    const updateMessageStamp = await ProductComment.updateOne(
                        {_id: searchBuyerProductAndComment._id, "productChat.buyerChatMessage._id": commentId},
                        {
                            $push: {
                                "productChat.$[i].buyerChatMessage.$[j].buyerMessageStamp": {
                                    userId: currentUserId,
                                    buyerMessageStampLike: icon
                                }
                            }
                        },
                        {
                            arrayFilters: [
                                {"i._id": searchBuyerProductAndComment.productChat[0]._id},
                                {"j._id": commentId}
                            ]
                        }
                    );
                    console.log(updateMessageLike , updateMessageStamp)

                }
            }

            console.log("これが塗る？" + searchListingProductAndComment)

        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export default productChatLike;
