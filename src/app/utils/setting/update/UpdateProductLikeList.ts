import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {Purchase} from "@/models/Purchase";

const UpdateProductLikeList = async () => {
    await connectDB();  // データベースに接続

    try {
        // 既存の全ユーザーにフィールドを追加
        const result = await Purchase.updateMany(
            { productId: { $exists: false } },  // このフィールドが存在しないユーザーのみ
            { $set: { productId: "677e313e766d524648fb94d9" } }  // フィールドを追加し、デフォルト値を設定
        );

        //console.log(　JSON.stringify(result)　);
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default UpdateProductLikeList;
