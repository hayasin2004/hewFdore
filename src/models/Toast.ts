import mongoose from 'mongoose';



const ToastCategory = ["商品関連", "いいね、フォローなど"]
type ToastCategoryType = (typeof ToastCategory)[number];

const AlreadyRead = ["既読", "未読", "削除"]
type AlreadyReadType = (typeof AlreadyRead)[number];

const ToastSchema = new mongoose.Schema({

        userId: {
            type: String,
            default : ""
        },
        followerUserId : {
            type : String,
            default : ""
        },
        likedUserId : {
            type : String,
            default : ""
        },
        productId: {
            type: String,
            default: ""
        },
        message: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            default: ""
        },
        toastCategory: {
            type: String,
            enum: ToastCategory,
            required: true,
            default: "",
        },
        alreadyRead: {
            type: String,
            enum: AlreadyRead,
            required: true,
            default: "未読",
        }
    },
    {timestamps: true}
)

export const Toast = mongoose.models.Toast || mongoose.model("Toast", ToastSchema);
// ||でユーザーが作られているかどうかの判定。既にユーザー登録していたら左を使用。
// UserSchemaをUserとして呼び出しています。　これからUserと言われたらこっから情報を取得しているって認識でお願いします。
