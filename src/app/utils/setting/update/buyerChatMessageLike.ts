"use server"
import {connectDB} from "@/lib/mongodb";
import {ProductComment} from "@/models/ProductComment";

const ChatMessageLike = async () => {
    await connectDB();
    try {
        const missingFieldDocs = await ProductComment.find({ChatMessageLike: {$exists: false}});

        const result = await ProductComment.updateMany(
            {ChatMessageLike: {$exists: false}},
            {$set: {ChatMessageLike: []}}
        )
        console.log(missingFieldDocs , result)
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default ChatMessageLike;

