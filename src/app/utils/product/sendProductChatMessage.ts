"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {ProductComment, productCommentType} from "@/models/ProductComment";

const sendProductChatMessage = async (productId: string | null, currentUser: string | null, chatMessage: string | null) => {

    await connectDB()
    try {
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const user = await User.findOne({_id: currentUser}).select("_id username profilePicture")
        console.log(user)
        const ExistChatMessage: productCommentType | null = await ProductComment.findOne({productId: productId})
        // 出品者だった場合の処理。
        console.log(productListingUser)
        if (productListingUser == null) {
            console.log("売り切れもしくは削除")
            return null
        } else {
            if (productListingUser.sellerId == currentUser) {
                if (ExistChatMessage == null) {
                    const createChatResponse = await ProductComment.create({
                        productId: productId,
                        listingUserId: productListingUser.sellerId,
                        chatMessage: [{
                            senderUserId: currentUser,
                            listingMessage: chatMessage,
                            listingMessageLike: [],
                            listingMessageUsername: user.username,
                            listingMessageProfilePicture: user.profilePicture
                        }]
                    })
                    createChatResponse.save()
                    return {listingChatResponse: JSON.stringify(createChatResponse)}
                } else {

                            console.log(ExistChatMessage?._id + "範囲接地")
                    if (ExistChatMessage.chatMessage !== undefined) {
                        console.log(ExistChatMessage.chatMessage[0].senderUserId == currentUser)
                        if (ExistChatMessage.chatMessage[0].senderUserId == currentUser) {
                            const updateChatResponse = await ProductComment.updateOne(
                                {_id: ExistChatMessage?._id, "chatMessage.senderUserId": currentUser},
                                {
                                    $push: {
                                        chatMessage: [{
                                            senderUserId: currentUser,
                                            listingMessage: chatMessage,
                                            listingMessageLike: [],
                                            listingMessageUsername: user.username,
                                            listingMessageProfilePicture: user.profilePicture
                                        }]
                                    }
                                }
                            );
                            console.log(updateChatResponse)
                            return null
                        }
                    }
                }


            }

            // 出品者ではなく閲覧者の場合の処理。
        }
    } catch (err) {
        console.error(err)
        console.error("更新中にエラーが発生しました:", err);
        return null
    }

}

export default sendProductChatMessage