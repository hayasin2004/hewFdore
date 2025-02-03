"use server"

import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(id : string, res: NextResponse) {
    await connectDB()
    try {
        const searchUser = await User.findOne({_id: id}).exec()
        if (!searchUser) {
        } else {
            return NextResponse.json(searchUser)
        }
    } catch (err) {
        console.log(err)
        return null
    }

}
