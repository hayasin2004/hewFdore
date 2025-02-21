"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {ProductComment, ProductCommentType} from "@/models/ProductComment";

const sendProductChatMessage = async (productId: string | null, currentUser: string | null, sendChatMessage: string | null) => {

    await connectDB()
    try {
         const productListingUser = await Product.findOne({_id: productId}).select("sellerId")
        const user = await User.findOne({_id: currentUser}).select("_id username profilePicture")
         const ExistChatMessage = await ProductComment.findOne({productId: productId})
        const ExistUserId: ProductCommentType | null = await ProductComment.findOne({buyerUserIdList: currentUser})


          if (productListingUser == null) {
             return null
        } else {
              if (ExistChatMessage == null) {
                if (productListingUser.sellerId == currentUser) {
                    const createChatResponse = await ProductComment.create({
                        productId: productId,
                        listingUserId: productListingUser.sellerId,
                        productChat: [{
                            listingChatMessage: [{
                                senderUserId: currentUser,
                                listingMessage: sendChatMessage,
                                listingMessageLike: [],
                                listingMessageUsername: user.username,
                                listingMessageProfilePicture: user.profilePicture,
                                timeStamp: new Date()
                            }],
                            chatUserRole: "出品者",

                        }]
                    })
                    createChatResponse.save()
                    return {listingChatResponse: JSON.stringify(createChatResponse)}
                } else {
                    const createChatResponse = await ProductComment.create({
                        productId: productId,
                        buyerUserIdList: currentUser,
                        listingUserId: productListingUser.sellerId,
                        productChat: [{
                            buyerChatMessage: [{
                                senderUserId: currentUser,
                                buyerMessage: sendChatMessage,
                                buyerMessageLike: [],
                                buyerMessageUsername: user.username,
                                buyerMessageProfilePicture: user.profilePicture,
                                timeStamp: new Date()
                            }],
                            chatUserRole: "購入者"
                        }]
                    })
                    createChatResponse.save()
                    return {buyerChatResponse: JSON.stringify(createChatResponse)}
                }
            } else {
                if (productListingUser.sellerId == currentUser) {
                    if (ExistChatMessage?.listingChatMessage !== undefined) {
                        if (ExistChatMessage?.listingChatMessage[0]?.senderUserId == currentUser) {
                            const updateChatResponse = await ProductComment.updateOne(
                                {
                                    _id: ExistChatMessage?._id,
                                    "productChat.listingChatMessage.senderUserId": currentUser
                                },
                                {
                                    $push: {
                                        productChat: [{

                                            listingChatMessage: [{
                                                senderUserId: currentUser,
                                                listingMessage: sendChatMessage,
                                                listingMessageLike: [],
                                                listingMessageUsername: user.username,
                                                listingMessageProfilePicture: user.profilePicture,
                                                timeStamp: new Date()
                                            }],
                                            chatUserRole: "出品者",
                                        }]
                                    }
                                }
                            );
                            console.log(updateChatResponse)
                        }
                        return {listingChatResponse: JSON.stringify(ExistChatMessage)}

                    } else {
                        const updateChatResponse = await ProductComment.updateOne(
                            {_id: ExistChatMessage?._id},
                            {
                                $push: {
                                    productChat: [{

                                        listingChatMessage: [{
                                            senderUserId: currentUser,
                                            listingMessage: sendChatMessage,
                                            listingMessageLike: [],
                                            listingMessageUsername: user.username,
                                            listingMessageProfilePicture: user.profilePicture,
                                            timeStamp: new Date()
                                        }],
                                        chatUserRole: "出品者",
                                    }]
                                }
                            }
                        );
                        console.log(updateChatResponse)

                        return {listingChatResponse: JSON.stringify(ExistChatMessage)}

                    }
                } else {

                    if (ExistUserId?.buyerUserIdList?.includes(currentUser!)) {
                        const updateChatResponse = await ProductComment.updateOne(
                            {_id: ExistChatMessage?._id, "productChat.buyerChatMessage.senderUserId": currentUser},
                            {
                                $push: {
                                    productChat: [{
                                        buyerChatMessage: [{
                                            senderUserId: currentUser,
                                            buyerMessage: sendChatMessage,
                                            buyerMessageLike: [],
                                            buyerMessageUsername: user?.username,
                                            buyerMessageProfilePicture: user.profilePicture,
                                            timeStamp: new Date(),
                                        }],
                                        chatUserRole: "購入者"
                                    }]
                                }
                            }
                        );
                        console.log(updateChatResponse)

                        return {listingChatResponse: JSON.stringify(ExistChatMessage)}

                    } else {
                        const updateChatResponse = await ProductComment.updateOne(
                            {_id: ExistChatMessage?._id},
                            {
                                $push: {
                                    buyerUserIdList: currentUser,
                                    productChat: [{

                                        buyerChatMessage: [{
                                            senderUserId: currentUser,
                                            buyerMessage: sendChatMessage,
                                            buyerMessageLike: [],
                                            buyerMessageUsername: user.username,
                                            buyerMessageProfilePicture: user.profilePicture,
                                            timeStamp: new Date(),
                                        }],
                                        chatUserRole: "購入者"
                                    }]
                                }
                            }
                        );
                        console.log(updateChatResponse)

                        return {listingChatResponse: JSON.stringify(ExistChatMessage)}

                    }
                }

            }


        }
    } catch (err) {
        console.error(err)
        console.error("更新中にエラーが発生しました:", err);
        return null
    }

}

export default sendProductChatMessage
