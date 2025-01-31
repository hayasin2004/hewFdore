"use server"
import {ProductType} from "@/app/utils/product/productDetail";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import toastProductLike from "@/app/utils/toast/toastProductLike";

const productLikeDate = async (productId: ProductType | null, currentUser: string | null):Promise<string | null> => {
    // await //console.log( productId,currentUser )
    await connectDB()
    try {
        if (!currentUser) {
            console.log("ログインしてください。")
            return "notLogin"
        }
        console.log("ここまでが")
        const productLike = await Product.findById(productId);
        // //console.log(productLike.like);

        if (productLike.sellerId == currentUser) {
            //console.log("自分が出品した商品にいいねはできません　")
            return null
        } else {
            if (productLike.productLike.includes(currentUser)) {
                const currentUserLikeUpdateDelete = await User.findByIdAndUpdate(currentUser, {
                    $pull : {
                        ProductLikeList : productLike._id
                    }
                }, {new: true})
                const productLikeUpdateDelete = await productLike.updateOne(
                    {$pull: {productLike: currentUser}},);
                //console.log(productLikeUpdateDelete)
                const productLikeOnce = await Product.findById(productId);
                console.log("窓辺においてきて")
                console.log(currentUserLikeUpdateDelete)
                console.log(productLikeUpdateDelete)

                console.log("いいね削除後のろぐ" + JSON.stringify(productLikeOnce))
            } else {
                const currentUserLikeUpdatePush = await User.findByIdAndUpdate(currentUser, {
                    $push : {
                        productLikeList : productLike._id
                    }
                },{new : true})
                const productLikeUpdatePush = await productLike.updateOne(
                    {$push: {productLike: currentUser}},);
                console.log(currentUserLikeUpdatePush)
                console.log(productLikeUpdatePush)

                const productLikeOnce = await Product.findById(productId);
                console.log("いいね追加後のろぐ" + JSON.stringify(productLikeOnce))
                // console.log(JSON.stringify(productLikeUpdatePush))
                console.log("君が褪せないように"+JSON.stringify(currentUserLikeUpdatePush))
                await toastProductLike(productId , productLike?.sellerId , currentUser )
                return {productLike: JSON.stringify(productLike)}
            }
        }
    } catch (err) {
        console.log(err)
        return  null
        
    }
    return null
}

export default productLikeDate