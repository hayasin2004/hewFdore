"use server"
import {ProductType} from "@/app/utils/product/productDetail";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";

const productLikeDate = async (productId: ProductType | null, currentUser: string | null) => {
    // await console.log( productId,currentUser )
    await connectDB()
    try {
        const productLike = await Product.findById(productId);
        console.log(productLike.like);

        const productLikeConfirm = await Product.findOne({_id: productId}, {like: currentUser});
        console.log(productLikeConfirm)
        if (productLike.like == currentUser) {
            const productLikeUpdateDelete = await productLike.updateOne(
                {$pull: {like: currentUser}},
                {new: true}

            );
            console.log(productLikeUpdateDelete)
            console.log("こ")
        } else {
            const productLikeUpdatePush = await productLike.updateOne(
                {$push: {like: currentUser}},
                {new: true});
            console.log(productLikeUpdatePush)
            console.log("ここまで来てないよね")
            console.log(productLike)
        }

        const pushUser = await User.findById(currentUser);
        console.log(pushUser)
    } catch (err) {
        console.log(err)
    }
    return null
}

export default productLikeDate