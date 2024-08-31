import mongoose, {Schema, model} from 'mongoose';

const UserSchema = new User({
    userId: {
        type: String,
        unique: true,
        required: true,
        min: 3,
        max: 12,
    },
    username :{
        type: String,
        unique: true,
        required: true,
        min: 1,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email :{
        type: String,
        unique: true,
        required: true,
        min: 6,
        max: 30
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverProfilePicture: {
        type: String,
        default: '',
    },
    desc :{
        // 自己紹介
        type: String,
        max : 120,
        default: '',
    },
    address :{
        // 住所
        type: String,
        max :200,
        default: '',
    },
    followings : {
        // フォローしている人。フォローしている人は増えたり減ったりするので、配列の型にしてます。
        type: Array,
        default: []
    },
    followers : {
        // フォローされている。フォローされている人は増えたり減ったりするので、配列の型にしてます。
        type: Array,
        default: []
    }

},
    {timestamps: true}
)

module.exports = mongoose.model("User" , UserSchema);
// UserSchemeをUserとして呼び出しています。　これからUserと言われたらこっから情報を取得しているって認識でお願いします。
