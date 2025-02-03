"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {NextResponse} from "next/server";
import {NextApiRequest} from "next";
import {UserData} from "next-auth/providers/42-school";

export interface UserType {
    id? : string
    token? : string
    _id? : string
    userId? : string;
    username? : string
    email? : string
    password? : string
    profilePicture? : string
    coverProfilePicture? : string
    desc? : string
    followings? : UserFollow[]
    followers? : UserFollow[]
    likeList? : string[]
    userData? : UserType,
    purchaseProduct? : string[]
    productLikeList? : string[]
}

export  interface UserFollow {
    _id?: string
    followings? : string,
    followers? : string,
}



export async function GET(req: NextApiRequest, res: NextResponse) {
    await connectDB()
    if (req.method === "GET") {
        try {
            const users   = await User.find()
            const userList  = users.map((item) => {
                return {id : item?._id , userId :  item?.UserId , username : item?.username , email : item?.email ,
                    profilePicture : item?.profilePicture ,coverProfilePicture : item?.coverProfilePicture , desc : item?.desc,
                    followings : item?.followings , followers : item?.followers  }
            })
            return NextResponse.json(userList)
        } catch (err) {
            NextResponse.json(err)
        }

    }else {
    }

}
