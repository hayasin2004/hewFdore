"use server"
import {GridFSBucket, GridFSBucketWriteStream} from 'mongodb';
import {connectDB} from "@/lib/mongodb";


const testvideoSave = async (video: FormData | null) => {
    const  mongoScheme: typeof import("mongoose") = await connectDB()
    try {
        console.log(video)
        const productVideo = video?.get("productVideo")
        if (productVideo instanceof File) {
            if (mongoScheme.connection.db !== undefined) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const bucket = new GridFSBucket(mongoScheme.connection.db)
                const uploadStream = bucket.openUploadStream(productVideo?.name)
                const writableStream = GridFSBucketWriteStream?.toWeb(uploadStream);
                const completeVideo = productVideo?.stream()?.pipeTo(writableStream);
                console.log(completeVideo)
                console.log(uploadStream.id)

                return uploadStream.id
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default testvideoSave;