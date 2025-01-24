import mongoose from "mongoose";
import  Grid from "gridfs-stream"
import  { GridFsStorage} from "multer-gridfs-storage";
import multer from "multer";

const mongoURI = process.env.MONGODB_URI!
let  gfs;

const connectGridFs = () => {
    if (!gfs){
        const conn = mongoose.connection;
        gfs = Grid(conn.db , mongoose.mongo)
        gfs.collection("uploads")
        console.log("GridFSを初期化")
    }
}

const storage  = new  GridFsStorage({
    url : mongoURI,
    options : { useNewUrlParser : true  , useUnifiedTopology: true },
    file : (data , file) => {
        return {
            filename : file.originalname,
            bucketName : "uploads"
        }
    }
})

const upload = multer({storage})

export {connectGridFs , gfs , upload}