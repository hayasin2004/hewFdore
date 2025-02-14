"use server"

import {connectDB} from "@/lib/mongodb";
import {Chat} from "@/models/Chat";

const directMessageLike = async (currentUserId: string | null, commentId: string | null, icon: string | null) => {
    await connectDB();
    console.log(currentUserId, commentId, icon);

    try {
        const searchDirectMessage = await Chat.findOne({"chatMessage._id": commentId}, {"chatMessage.$": 1});
        console.log(searchDirectMessage)
        if (searchDirectMessage != null) {
            if (searchDirectMessage.senderUserId == currentUserId) {
                console.log("自分のコメントにはいいねできません。");
                return null;
            }
            console.log("デバック１" + searchDirectMessage.messageStamp == null)
            if (searchDirectMessage.chatMessage[0].messageStamp == null) {
                console.log("新しく追加されたコード");

                const updateMessageStamp = await Chat.updateOne(
                    {"chatMessage._id": commentId},
                    {
                        $push: {
                            "chatMessage.$.messageStamp": [{
                                userId: currentUserId,
                                messageStampLike: icon
                            }]
                        }
                    },
                );
                console.log(updateMessageStamp)
                return null;
            } else {


                const includesCurrentUserId = searchDirectMessage.chatMessage[0].messageStamp[0]?.userId == currentUserId;
                if (includesCurrentUserId) {
                    console.log("出品者既にログインしているアカウントでコメントをいいねしている。");

                    const updateMessageStamp = await Chat.updateOne(
                        {"chatMessage._id": commentId},
                        {
                            $pull: {
                                "chatMessage.$.messageStamp": {
                                    userId: currentUserId,
                                }
                            }
                        },
                    );
                    console.log(updateMessageStamp);
                } else {
                    console.log("デバック用コメント4");
                    console.log( searchDirectMessage.chatMessage[0].messageStamp[0]?.userId == currentUserId)
                    const updateMessageStamp = await Chat.updateOne(
                        {"chatMessage._id": commentId},
                        {
                            $push: {
                                "chatMessage.$.messageStamp": {
                                    userId: currentUserId,
                                    messageStampLike: icon
                                }
                            }
                        },
                    );

                    console.log(updateMessageStamp);
                }
            }
        } else {
            console.log("メールが見つかりません");
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default directMessageLike;
