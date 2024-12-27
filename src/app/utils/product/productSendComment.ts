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
        const ExistChatMessage: ProductCommentType | null = await ProductComment.find({productId: productId}).select("_id listingUserId buyerUserId productId  ExistChatMessage")
        if (ExistChatMessage.length === 0 || !ExistChatMessage.some(itemBuyer => itemBuyer.buyerUserId == currentUser)) {
            // 出品者だった場合の処理。
                console.log(!ExistChatMessage.some(itemListing => itemListing.listingUserId == currentUser))

                const testFn = async () => {

                    const createChatResponse = await ProductComment.create({
                        listingUserId: productListingUser.sellerId,
                        buyerUserId: currentUser,
                        productId: productId,
                        ChatMessage: ({
                            senderUserId: currentUser,
                            buyerMessage: chatMessage,
                            buyerMessageLike: [],
                            buyerUsername: user.username,
                            buyerProfilePicture: user.profilePicture
                        })
                    })
                    createChatResponse.save()
                    return {buyerChatResponse: JSON.stringify(createChatResponse)}
                }
                testFn()
        } else {
            if (productListingUser.sellerId == currentUser) {
                for (const item of ExistChatMessage) {
                    if (item.senderUserId == currentUser) {
                        const updateChatResponse = await ProductComment.updateMany(
                            {_id: item._id, "listingChatMessage.senderUserId": currentUser},
                            {
                                $push: {
                                    listingChatMessage: {
                                        senderUserId: currentUser,
                                        Message: chatMessage,
                                        MessageLike: [],
                                        Username: user.username,
                                        ProfilePicture: user.profilePicture
                                    }
                                }
                            }
                        )
                        console.log("出品者のコメント" + JSON.stringify(updateChatResponse))
                        return {listingChatResponse: JSON.stringify(updateChatResponse)}
                    }
                }
            } else {

                // 出品者ではなく閲覧者の場合の処理。
                for (const item of ExistChatMessage) {
                    if (item.buyerUserId == currentUser) {
                        try {
                            const updateChatResponse = await ProductComment.updateOne(
                                {_id: item._id, "ChatMessage.senderUserId": currentUser},
                                {
                                    $push: {
                                        chatMessage: {
                                            senderUserId: currentUser,
                                            Message: chatMessage,
                                            MessageLike: [],
                                            Username: user.username,
                                            ProfilePicture: user.profilePicture
                                        }
                                    }
                                }
                            );
                            console.log("すでに作成されてるからメッセージだけ、更新しました。", updateChatResponse);
                            return {buyerChatResponse: updateChatResponse};
                        } catch (error) {
                            console.error("更新中にエラーが発生しました:", error);
                        }
                    }
                }
            }
        }


        // ExistChatMessage.map((item) => {
        //         console.log(item.buyerUserId == currentUser)
        //         if (item.buyerUserId == currentUser) {
        //
        //             const testFn = async () => {
        //
        //                 // 閲覧者が投稿を複数投稿したときのupdate文
        //                 const updateChatResponse = await ProductComment.updateOne(
        //                     {_id: ExistChatMessage?._id, "ChatMessage.senderUserId": currentUser,},
        //                     {
        //                         $push: {
        //                             ChatMessage: ({
        //                                 buyerMessage: chatMessage,
        //                                 buyerMessageLike: [],
        //                                 buyerUsername: user.username,
        //                                 buyerProfilePicture: user.profilePicture
        //                             })
        //                         }
        //                     }
        //                 )
        //                 console.log("すでに作成されてるからメッセージだけ、更新しました。" + JSON.stringify(updateChatResponse))
        //                 return {buyerChatResponse: JSON.stringify(updateChatResponse)}
        //
        //             }
        //             testFn()
        //         }
        //     }
        // )

        // const testFn = async () => {
        //
        //     const createChatResponse = await ProductComment.create({
        //         listingUserId: productListingUser.sellerId,
        //         buyerUserId: currentUser,
        //         productId: productId,
        //         ChatMessage: ({
        //             senderUserId: currentUser,
        //             buyerMessage: chatMessage,
        //             buyerMessageLike: [],
        //             buyerUsername: user.username,
        //             buyerProfilePicture: user.profilePicture
        //         })
        //     })
        //     createChatResponse.save()
        //     return {buyerChatResponse: JSON.stringify(createChatResponse)}
        // }
        // testFn()


        {
            const testFn1 = async () => {


                // 閲覧者が投稿を複数投稿したときのupdate文
                const updateChatResponse = await ProductComment.updateOne(
                    {_id: ExistChatMessage?._id, "ChatMessage.senderUserId": currentUser,},
                    {
                        $push: {
                            ChatMessage: ({
                                buyerMessage: chatMessage,
                                buyerMessageLike: [],
                                buyerUsername: user.username,
                                buyerProfilePicture: user.profilePicture
                            })
                        }
                    }
                )
                console.log("すでに作成されてるからメッセージだけ、更新しました。" + JSON.stringify(updateChatResponse))
                return {buyerChatResponse: JSON.stringify(updateChatResponse)}

            }
            testFn1()
        }

    } catch (err) {
        console.error(err)
        return null
    }
}

export default productSendComment