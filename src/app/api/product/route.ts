import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest ) {
    await connectDB()

    if (req.method === "GET") {
        try {
            const product = await Product.find({sellStatus : "販売中"});
            return NextResponse.json(product)
        } catch (err) {
            console.log(err)
             return NextResponse.json({status: "Error", message: "商品の取得に失敗"})
        }
    } else {
         return NextResponse.json({status: "Error", message: "メソッドが違うかも"})
    }

}


