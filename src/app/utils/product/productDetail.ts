    "use server"

    import {connectDB} from "@/lib/mongodb";
    import {Product} from "@/models/Product";
    import { User } from "@/models/User";

    export interface ProductType {
        id?: string
        _id?: string,
        sellerId?: string,
        username? :string,
        productName?: string,
        productDesc?: string,
        productPrice?: string,
        productPicture?: string,
        productVideo?: string,
        productSize?: string,
        productCategory?: string,
        postageBurden?: string,
        productCondition?: string

    }


    const productDetail = async (id: string): Promise<ProductType | null> => {
        await connectDB()
        console.log(id)
        console.log("データベースから取得してきた!!!")
        try {
            const product: ProductType = await Product.findById({_id: id})
            console.log(product)
            const userName : ProductType = await User.findOne({_id: product.sellerId}).exec()
            console.log(userName)
            return {
                id:product?._id,
                sellerId:userName?.sellerId,
                username :userName.username,
                productName:product?.productName,
                productDesc:product?.productDesc,
                productSize:product?.productSize,
                productCategory:product?.productCategory,
                postageBurden: product?.postageBurden,
                productCondition : product?.productCondition,
                productPrice: product?.productPrice,
                productPicture:product?.productPicture,
                productVideo:product?.productVideo
            }
        } catch (err) {
            console.error(err)
            return null
        }
    }

    export default productDetail;
