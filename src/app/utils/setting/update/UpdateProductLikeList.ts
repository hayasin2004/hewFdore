import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const UpdateProductLikeList = async () => {
    await connectDB();  // データベースに接続

    try {
        // 既存の全ユーザーにフィールドを追加
        const result = await User.updateMany(
            { productLikeList: { $exists: false } },  // このフィールドが存在しないユーザーのみ
            { $set: { productLikeList: [] } }  // フィールドを追加し、デフォルト値を設定
        );

        console.log(　JSON.stringify(result)　);
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default UpdateProductLikeList;
