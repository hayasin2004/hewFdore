"use server"

import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/User";
import {UserType} from "@/app/api/user/catchUser/route";
import {NextResponse} from "next/server";

const confirmPassword = async (email: string | null, password: string | null) => {
    await connectDB()
    //console.log(email, password);
    try {
        if (email !== null && password !== null) {
            const emailUserCheck: UserType | null = await User.findOne({email: email}).select("email password");
            //console.log(emailUserCheck?.email == email || emailUserCheck?.password == password)
            if (emailUserCheck?.email !== email || emailUserCheck?.password !== password) {
                //console.log("メールアドレスが違います。もしくはパスワードが違います。")
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