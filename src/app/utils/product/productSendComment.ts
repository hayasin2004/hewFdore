"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {ProductComment, productCommentType, ProductCommentType} from "@/models/ProductComment";
import {User} from "@/models/User";

const productSendComment = async (productId: string | null, currentUser: string | null, chatMessage: string | null) => {
    console.log("ByBuyerUserSendChatMessage", productId, currentUser, chatMessage);
    await connectDB()
    try {
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const user = await User.findOne({_id: currentUser}).select("_id username profilePicture")
        console.log(user)
        const ExistChatMessage: ProductCommentType | null = await ProductComment.findOne({productId: productId}).select("_id listingUserId buyerUserId productId buyerChatMessage")
        const testFunction: productCommentType | null = ExistChatMessage.buyerChatMessage.find(msg => msg.senderUserId === currentUser)

        // 出品者だった場合の処理。
        if (productListingUser.sellerId == currentUser) {
            if (testFunction) {
                console.log(testFunction)
                const updateChatResponse = await ProductComment.updateMany(
                    {_id: ExistChatMessage?._id, "listingChatMessage.senderUserId": currentUser},
                    {
                        $push: {
                            listingChatMessage: ({
                                senderUserId: currentUser,
                                listingMessage: chatMessage,
                                listingMessageLike: [],
                                listingUsername: user.username,
                                listingProfilePicture: user.profilePicture
                            })
                        }
                    }
                )
                console.log("出品者のコメント" + JSON.stringify(updateChatResponse))
                return {listingChatResponse: JSON.stringify(updateChatResponse)}
            } else {
                const createChatResponse = await ProductComment.create({
                    productId: productId,
                    listingUserId: productListingUser.sellerId,
                    listingChatMessage: ({
                        listingMessage: chatMessage,
                        listingMessageLike: [],
                        listingUsername: user.username,
                        listingProfilePicture: user.profilePicture
                    })
                })
                console.log("出品者が初めての投稿でした。新しくチャットルームを作成します。")
                createChatResponse.save()
                console.log("見つからない")
                return {listingChatResponse: JSON.stringify(createChatResponse)}

            }


        }

        // 出品者ではなく閲覧者の場合の処理。
        // const includesCurrentUserId = ExistChatMessage.buyerChatMessage.includes(currentUser);
        if (productListingUser.sellerId !== currentUser) {
            if (testFunction) {
                const updateChatResponse = await ProductComment.updateOne(
                    {_id: ExistChatMessage?._id, "buyerChatMessage.senderUserId": currentUser,},
                    {
                        $push: {
                            buyerChatMessage: ({
                                senderUserId: currentUser,
                                buyerMessage: chatMessage,
                                buyerMessageLike: [],
                                buyerUsername: user.username,
                                buyerProfilePicture: user.profilePicture
                            })
                        }
                    }
                )
                console.log("すでに作成されてるからメッセージだけ、更新しました。" + JSON.stringify(updateChatResponse))
                console.log(testFunction)
                return {buyerChatResponse: JSON.stringify(updateChatResponse)}

            } else {
                const createChatResponse = await ProductComment.create({
                    listingUserId: productListingUser.sellerId,
                    buyerUserId: currentUser,
                    productId: productId,
                    buyerChatMessage: ({
                        senderUserId: currentUser,
                        buyerMessage: chatMessage,
                        buyerMessageLike: [],
                        buyerUsername: user.username,
                        buyerProfilePicture: user.profilePicture
                    })
                })
                createChatResponse.save()
                console.log("見つからない")
                return {buyerChatResponse: JSON.stringify(createChatResponse)}
            }
            // 閲覧者が投稿を複数投稿したときのupdate文

        }

    } catch (err) {
        console.error(err)
        return null
    }
}

export default productSendComment