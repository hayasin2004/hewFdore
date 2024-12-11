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
        // console.log(productLike.like);

        if (productLike.sellerId == currentUser) {
            console.log("自分が出品した商品にいいねはできません")
            return null
        } else {
            if (productLike.productLike == currentUser) {
                const productLikeUpdateDelete = await productLike.updateOne(
                    {$pull: {productLike: currentUser}},);
                console.log(productLikeUpdateDelete)
                console.log("こ")
                const productLikeOnce = await Product.findById(productId);
                console.log("いいね削除後のろぐ" + JSON.stringify(productLikeOnce))
            } else {
                const productLikeUpdatePush = await productLike.updateOne(
                    {$push: {productLike: currentUser}},);
                console.log("ここまで来てないよね")
                const productLikeOnce = await Product.findById(productId);
                console.log("いいね追加後のろぐ" + JSON.stringify(productLikeOnce))
                console.log(productLikeUpdatePush)
                return {productLike: JSON.stringify(productLike)}
            }
        }
    } catch (err) {
        console.log(err)
    }
    return null
}

export default productLikeDate