"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {NextResponse} from "next/server";
import {NextApiRequest} from "next";

export interface UserType {
    id? : string
    _id? : string
    userId? : string;
    username? : string
    email? : string
    profilePicture? : string
    coverProfilePicture? : string
    desc? : string
    followings? : string
    followers? : string
}


export async function GET(req: NextApiRequest, res: NextResponse) {
    await connectDB()
    if (req.method === "GET") {
        try {
            const users = await User.find()
            const userList  :UserType[] = users.map((item) => {
                return {id : item?._id , userId :  item?.UserId , username : item?.username , email : item?.email ,
                    profilePicture : item?.profilePicture ,coverProfilePicture : item?.coverProfilePicture , desc : item?.desc,
                    followings : item?.followings , followers : item?.followers  }
            })
            return NextResponse.json(userList)
        } catch (err) {
            NextResponse.json(err)
        }

    }else {
        console.log("ユーザーリスト表示失敗")
    }

}
