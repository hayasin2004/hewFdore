"use server"
import {GridFSBucket, GridFSBucketWriteStream} from 'mongodb';
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";

const testvideoSave = async (video: FormData | null) => {
    const mongoScheme = await connectDB()
    try {

        console.log(video)
        const productVideo = video?.get("productVideo")
        if (productVideo instanceof File) {
            if (mongoScheme.connection.db !== undefined) {
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