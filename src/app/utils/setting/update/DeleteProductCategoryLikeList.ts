import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const DeleteProductCategoryLikeList = async () => {
    await connectDB();  // データベースに接続

    try {
        // 既存の全ユーザーにフィールドを追加
        const result = await User.updateMany(
            {$pull: {productCategoryLikeList:"outer"}},
        ).exec();
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default DeleteProductCategoryLikeList;

