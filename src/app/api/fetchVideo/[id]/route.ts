"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {GridFSBucketReadStream, ObjectId} from "mongodb";
import {GridFSBucket} from "mongodb";
import {PassThrough} from "node:stream";
import {NextResponse} from "next/server";

export interface ProductType {
    product?: string;
    id?: string
    _id?: string,
    sellerId?: string,
    sellerUserName?: string,
    username?: string,
    productName?: string,
    productDesc?: string,
    productPrice?: string,
    productPicture?: string,
    productVideo?: string,
    productSize?: string,
    productCategory?: string,
    shippingArea?: string,
    productLike?: string,
    postageBurden?: string,
    productCondition?: string,
    productImage?: string,
    stripeCode?: string
    payPayCode?: string
}

export async function GET({params}: { params: { id: string } }) {
    const mongoScheme = await connectDB()
    try {
        const db = mongoScheme.connection.db
        const bucket = new GridFSBucket(mongoScheme?.connection?.db)
        const product: ProductType | null = await Product.findById(params.id)
        const video = await db?.collection("fs.files").findOne({_id: new ObjectId(product?.productVideo)})
        // ↑まで行けた
        const readStream = bucket.openDownloadStream(new ObjectId(video?._id))
        // console.log(video)

        const nodeStream = GridFSBucketReadStream.toWeb(readStream)
        console.debug("fetchvideo" , readStream)
        return new Response(new ReadableStream(nodeStream), {status: 200, headers: {"Content-Type": "video/mp4"}})
        // const passThrough = new PassThrough();
        // const downloadStream = Files.openDownloadStream(id);

        // // readStream.pipe(passThrough);
        // console.debug("aaaaa",
        //     new ReadableStream(GridFSBucketReadStream.toWeb(readStream)))
        // return new NextResponse(passThrough, {
        //     status: 200,
        //     headers: {
                // "Content-Type": contentType,
            // },
        // });
        // return new Response(`aaa`,{status: 500})
    } catch (err) {
        console.error(err)
        return new Response(`err ${err}`,{status: 500})
    }
}


// const productDetail = async (id: string): Promise<{ product: string | null } | { video: string | null } | null> => {
//     const mongoScheme = await connectDB()
//     try {

// if (mongoScheme.connection.db !== undefined) {
//     const bucket = new GridFSBucket(mongoScheme.connection.db)
//     const readStream = bucket.openDownloadStream(new ObjectId(video?._id))
//     console.log(readStream)
//     const renderVideo = bucket?.pipeTo(readStream)
//             return {product: JSON.stringify(product), video: JSON.stringify(video?.filename)}
//         }
//         return {product: JSON.stringify(product), video: JSON.stringify(video?.filename)}
//
//         //console.log(userName)
//
//     } catch (err) {
//         console.error(err)
//         console.error(err)
//         return null
//     }
// }

// export default productDetail;

