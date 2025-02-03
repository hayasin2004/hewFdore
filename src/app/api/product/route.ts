import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {NextApiRequest } from "next";
import {NextResponse} from "next/server";

export interface DBProductType {
    _id?: string;
    userId?: string;
    productName?: string;
    productDesc?: string;
    productPrice?: number;
}


export async function GET(req: NextApiRequest, res: NextResponse) {
    await connectDB()


    if (req.method === "GET") {
        try {
            const product = await Product.find({sellStatus : "selling"});
            console.log(res)
            return NextResponse.json(product)
        } catch (err) {
            console.log(err)
             return NextResponse.json({status: "Error", message: "商品の取得に失敗"})

        }
    } else {
         return NextResponse.json({status: "Error", message: "メソッドが違うかも"})
    }

}


