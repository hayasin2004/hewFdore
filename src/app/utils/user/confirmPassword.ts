"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextResponse} from "next/server";

const confirmPassword = async (email: string | null, password: string | null) => {
    await connectDB()
    try {
        if (email !== null && password !== null) {
            const emailUserCheck　= await User.findOne({email: email}).select("email password");
              if (emailUserCheck?.email !== email || emailUserCheck?.password !== password) {
             } else {
                return NextResponse.json({success: true})
            }
        }

    } catch (err) {
        console.error(err)
        return NextResponse.json({success: false})

    }
}
export default confirmPassword