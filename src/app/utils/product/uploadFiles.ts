"use server"

import nextConnect from  "next-connect"
import {connectDB} from "@/lib/mongodb";
import {connectGridFs , upload} from "@/lib/gridfs";

const uploadFiles = async  (files : string | null) => {
    await connectDB()
    const handler = nextConnect()
    connectGridFs()
    return files

}

export default  uploadFiles;