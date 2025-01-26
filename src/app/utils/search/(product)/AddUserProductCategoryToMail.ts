"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {User} from "@/models/User";
import nodemailer from "nodemailer";
import {ProductType} from "@/app/utils/product/productDetail";
import {UserType} from "@/app/api/user/catchUser/route";

const addUserProductCategoryToMail = async (category : string , newProduct : string) => {
    await connectDB()
    try {
        const searchProduct: ProductType | null =await Product.findById(newProduct._id);
        const searchProductCategory : UserType[] = await User.find({productCategoryLikeList: category}).select("username email productCategory");
        //console.log(searchProductCategory)
        if (searchProduct == null){
            //console.log("商品が追加されていない可能性があります。")
            return null
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.GMAILUSER,
                pass: process.env.GMAILPASSWORD,
            }
        })

        //     カテゴリーが追加されたの通知
        for (const user of searchProductCategory) {
            const product = searchProduct
            const toUserMailData = {
                from: process.env.GMAILUSER,
                to: "testnodemailermastakahew@gmail.com",
                subject: "お気に入りに追加したテゴリーに新しく商品が追加されました。",
                html: `
                <p>お気に入りに追加したカテゴリー商品の内容</p>
                <p>出品者名: ${product.sellerUserName}</p>
                <p>商品名: ${product.productName}</p>
                <p>価格: ${product.productPrice}</p>
                <p>商品説明: ${product.productDesc}</p>
                <p>商品カテゴリー: ${product.productCategory}</p>
                <p>商品サイズ: ${product.productSize}</p>
                <p>商品状態: ${product.productCondition}</p>
                <p>送料負担者: ${product.postageBurden}</p>
                `
            }
            //console.log("送信完了")
            await transporter.sendMail(toUserMailData)
        }


    } catch (err) {
        console.error(err)
        //console.log("メールの送信に失敗しました。")
    }
}
export default addUserProductCategoryToMail