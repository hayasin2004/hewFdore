"use server"
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const InsertProductCategoryLikeList = async () => {
    await connectDB();  // データベースに接続

    try {
        // 既存の全ユーザーにフィールドを追加
        const result = await User.updateMany(
            {$push : {productCategoryLikeList:"outer"}},  // このフィールドが存在しないユーザーのみ
        );
        //console.log(JSON.stringify(result));
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default InsertProductCategoryLikeList;

