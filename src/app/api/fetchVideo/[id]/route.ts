"use server"

import {connectDB} from "@/lib/mongodb";
import {Product} from "@/models/Product";
import {GridFSBucket, GridFSBucketReadStream, ObjectId} from "mongodb";

export interface ProductType {
    product?: string;
    id?: string;
    _id?: string;
    sellerId?: string;
    sellerUserName?: string;
    username?: string;
    productName?: string;
    productDesc?: string;
    productPrice?: string;
    productPicture?: string;
    productVideo?: string;
    productSize?: string;
    productCategory?: string;
    sellerUserDesc? : string
    shippingArea?: string;
    productLike?: string;
    postageBurden?: string;
    productCondition?: string;
    productImage?: string;
    stripeCode?: string;
    payPayCode?: string;
}

export async function GET(
    request: Request,
    {params}: { params: { id: string } }
): Promise<Response> {
    const mongoScheme = await connectDB();
    if (!mongoScheme || !mongoScheme.connection || !mongoScheme.connection.db) {
        return new Response("Failed to connect to MongoDB", {status: 500});
    }

    try {
        const db = mongoScheme.connection.db;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const bucket = new GridFSBucket(db);
        const product: ProductType | null = await Product.findById(params.id);
        const video = await db.collection("fs.files").findOne({_id: new ObjectId(product?.productVideo)});

        if (!video) {
            return new Response("Video not found", {status: 404});
        }

        const readStream = bucket.openDownloadStream(new ObjectId(video._id));
        const nodeStream = GridFSBucketReadStream.toWeb(readStream);
        console.debug("fetchvideo", readStream);

        return new Response(new ReadableStream(nodeStream), {status: 200, headers: {"Content-Type": "video/mp4"}});
    } catch (err) {
        console.error(err);
        return new Response(`err ${err}`, {status: 500});
    }
}
