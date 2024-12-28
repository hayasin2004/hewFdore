"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {ProductComment} from "@/models/ProductComment";

const ChatMessageLike = async () => {
    await connectDB();  // データベースに接続
    console.log("更新完了")
    try {
        const missingFieldDocs = await ProductComment.find({ChatMessageLike: {$exists: false}});
        console.log(missingFieldDocs);

        // 既存の全ユーザーにフィールドを追加
        const result = await ProductComment.updateMany(
            {ChatMessageLike: {$exists: false}},  // このフィールドが存在しないユーザーのみ
            {$set: {ChatMessageLike: []}}  // フィールドを追加し、デフォルト値を設定
        );
        console.log(JSON.stringify(result));
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default ChatMessageLike;

