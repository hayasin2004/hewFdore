"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {ProductComment} from "@/models/ProductComment";

const buyerChatMessageLike = async () => {
    await connectDB();  // データベースに接続
    console.log("更新完了")
    try {
        const missingFieldDocs = await ProductComment.find({buyerChatMessageLike: {$exists: false}});
        console.log(missingFieldDocs);

        // 既存の全ユーザーにフィールドを追加
        const result = await ProductComment.updateMany(
            {buyerChatMessageLike: {$exists: false}},  // このフィールドが存在しないユーザーのみ
            {$set: {buyerChatMessageLike: []}}  // フィールドを追加し、デフォルト値を設定
        );
        console.log(JSON.stringify(result));
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default buyerChatMessageLike;

