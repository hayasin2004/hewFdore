    "use server"

    import {connectDB} from "@/lib/mongodb";
    import {Product} from "@/models/Product";
    import { User } from "@/models/User";

    export interface ProductType {
        id?: string
        _id?: string,
        userId?: string,
        username? :string,
        productName?: string,
        productDesc?: string,
        productPrice?: string,
        productPicture?: string,
        productVideo?: string,

    }


    const productDetail = async (id: string): Promise<ProductType | null> => {
        await connectDB()
        console.log(id)
        console.log("データベースから取得してきた")
        try {
            const product: ProductType = await Product.findById({_id: id})
            console.log(product)
            const userName : ProductType = await User.findById({_id: product.userId}).exec()
            return {
                id: JSON.stringify(product?._id),
                userId: JSON.stringify(product?.userId),
                username : JSON.stringify(userName.username),
                productName: JSON.stringify(product?.productName),
                productDesc: JSON.stringify(product?.productDesc),
                productPrice:JSON.stringify( product?.productPrice),
                productPicture: JSON.stringify(product?.productPicture),
                productVideo: JSON.stringify(product?.productVideo)
            }
        } catch (err) {
            console.error(err)
            return null
        }
    }

    export default productDetail;
