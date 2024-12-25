"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {ProductComment, ProductCommentType} from "@/models/ProductComment";

const productSendComment = async (productId: string | null, currentUser: string | null, chatMessage: string | null) => {
    console.log("ByBuyerUserSendChatMessage", productId, currentUser, chatMessage);
    await connectDB()
    try {
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const ExistChatMessage: ProductCommentType | null = await ProductComment.findOne({productId : productId}).select("_id listingUserId buyerUserId productId")

        // console.log(ExistChatMessage?.listingUserId !== currentUser)
        // 出品者だった場合の処理。
        if (productListingUser.sellerId == currentUser) {
            if (ExistChatMessage?.listingUserId  !== currentUser && ExistChatMessage?.productId !== productId) {
                const createChatResponse = await ProductComment.create({
                    productId: productId,
                    listingUserId:productListingUser.sellerId,
                    listingChatMessage: ({listingMessage : chatMessage , listingMessageLike : []})
                })
                console.log("出品者が初めての投稿でした。新しくチャットルームを作成します。")
                createChatResponse.save()
                return { listingChatResponse: JSON.stringify(createChatResponse) }
            } else {
                const updateChatResponse = await ProductComment.updateMany(
                    {
                        $push: {
                            listingChatMessage: ({listingMessage : chatMessage , listingMessageLike : []})
                        }
                    }
                )
                console.log("出品者のコメント" + JSON.stringify(updateChatResponse))
                return { listingChatResponse: JSON.stringify(updateChatResponse) }
            }

        }

        // 出品者ではなく閲覧者の場合の処理。
        if (ExistChatMessage?.buyerUserId !== currentUser ) {
            const createChatResponse = await ProductComment.create({
                listingUserId:productListingUser.sellerId,
                buyerUserId: currentUser,
                productId: productId,
                buyerChatMessage:({buyerMessage : chatMessage,buyerMessageLike : []})
            })
            createChatResponse.save()
            return { buyerChatResponse: JSON.stringify(createChatResponse) }
        } else {
            // 閲覧者が投稿を複数投稿したときのupdate文
            const updateChatResponse = await ProductComment.updateOne(
                {_id: ExistChatMessage?._id},
                {
                    $push: {
                        buyerChatMessage: ({buyerMessage : chatMessage , buyerMessageLike : []})
                    }
                }
            )
            console.log("すでに作成されてるからメッセージだけ、更新しました。" + JSON.stringify(updateChatResponse))
            return { buyerChatResponse: JSON.stringify(updateChatResponse) }

        }

    } catch (err) {
        console.error(err)
        return null
    }
}

export default productSendComment