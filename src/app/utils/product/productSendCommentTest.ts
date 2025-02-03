"use server"

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { ProductComment, ProductCommentType } from "@/models/ProductComment";
import { User } from "@/models/User";

const productSendComment = async (productId : string | null, currentUser : string | null, chatMessage: string | null) => {
    await connectDB();
    try {
        const productListingUser = await Product.findOne({ _id: productId }).select("sellerId");
        const user = await User.findOne({ _id: currentUser }).select("_id username profilePicture");

        const ExistChatMessage = await ProductComment.find({ productId: productId }).select("_id listingUserId buyerUserId productId ChatMessage");

         await Promise.all(ExistChatMessage.map(async (item) => {
            const chatExists = item.ChatMessage.some(msg => msg.senderUserId === currentUser);
            const status = chatExists ? "UPDATE" : "CREATE";

            switch (status) {
                case "UPDATE":
                    const updateChatMessage = {
                        senderUserId: currentUser,
                        buyerMessage: chatMessage,
                        buyerMessageLike: [],
                        buyerUsername: user.username,
                        buyerProfilePicture: user.profilePicture
                    };
                    if (productListingUser.sellerId === currentUser) {
                        await ProductComment.updateMany(
                            { _id: item._id, "listingChatMessage.senderUserId": currentUser },
                            { $push: { listingChatMessage: updateChatMessage } }
                        );
                      } else {
                        await ProductComment.updateOne(
                            { _id: item._id, "ChatMessage.senderUserId": currentUser },
                            { $push: { ChatMessage: updateChatMessage } }
                        );
                    }
                    break;
                case "CREATE":
                    const newChatMessage = {
                        senderUserId: currentUser,
                        buyerMessage: chatMessage,
                        buyerMessageLike: [],
                        buyerUsername: user.username,
                        buyerProfilePicture: user.profilePicture
                    };
                    const newComment = {
                        productId: productId,
                        listingUserId: productListingUser.sellerId,
                        ChatMessage: [newChatMessage]
                    };
                    const createChatResponse = new ProductComment(newComment);
                    await createChatResponse.save();
                     break;
                default:
                     break;
            }
        }));

    } catch (err) {
        console.log(err);
        return null;
    }
};

export default productSendComment;
