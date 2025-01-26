"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";

export async function GET(id : string, res: NextResponse) {
    await connectDB()
    try {
        const searchUser = await User.findOne({_id: id}).exec()
        if (!searchUser) {
            //console.log("ユーザーが見つかりませんでした。")
        } else {
            //console.log("返すことのできるモノ" + searchUser)
            return NextResponse.json(searchUser)
        }
    } catch (err) {
        //console.log(err)
        return null
    }

}
