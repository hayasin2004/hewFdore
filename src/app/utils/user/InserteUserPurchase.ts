import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const InsertProductSellStatus = async () => {
    await connectDB();  // データベースに接続
    console.log("追加の関数呼ばれてる")

    try {
        const test = await User.findOne({email : "test1@test.test"})
        console.log(test)
        // // 既存の全ユーザーにフィールドを追加
        // const result = await User.updateMany(
        //     {purchaseProduct: {$exists: false}},  // このフィールドが存在しないユーザーのみ
        //     {$set: {purchaseProduct: []}}  // フィールドを追加し、デフォルト値を設定
        // );
    } catch (err) {
        console.error('Error updating users: ', err);
    }
};

export default InsertProductSellStatus;

