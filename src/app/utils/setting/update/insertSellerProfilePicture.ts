import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";

const InsertProductSellStatus = async () => {
    await connectDB();  // データベースに接続

    try {
        // 既存の全ユーザーにフィールドを追加
        const result = await Product.updateMany(
            {sellerUserProfilePicture: {$exists: false}},  // このフィールドが存在しないユーザーのみ
            {$set: {sellerUserProfilePicture: ""}}  // フィールドを追加し、デフォルト値を設定
        );
        console.log(JSON.stringify(result));
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default InsertProductSellStatus;

