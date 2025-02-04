"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {ProductComment,  ProductCommentType} from "@/models/ProductComment";
import {User} from "@/models/User";

const productSendComment = async (productId: string | null, currentUser: string | null, chatMessage: string | null) => {
     await connectDB()
    try {
        const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const user = await User.findOne({_id: currentUser}).select("_id username profilePicture")
         const ExistChatMessage: ProductCommentType | null = await ProductComment.find({productId: productId}).select("_id listingUserId buyerUserId productId  ExistChatMessage")
        if (ExistChatMessage.length === 0 || !ExistChatMessage.some(itemBuyer => itemBuyer.buyerUserId == currentUser)) {
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
                          return {listingChatResponse: JSON.stringify(updateChatResponse)}
                    }
                }
            } else {

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
                             return {buyerChatResponse: updateChatResponse};
                        } catch (error) {
                            console.error("更新中にエラーが発生しました:", error);
                        }
                    }
                }
            }
        }




        {
            const testFn1 = async () => {


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