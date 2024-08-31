import * as mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL as string); /*データベース連携*/
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}