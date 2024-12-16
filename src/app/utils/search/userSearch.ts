"use server"

import {UserType} from "@/app/api/user/catchUser/route";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";

const userSearch = async (userSearchWord: string | null): Promise<string | null> => {
    await connectDB()

    try {
        if (userSearchWord === null) {
            console.log("文字を入力してください")
            return null
        }

        await console.log("個々のログ出てる？" + userSearchWord)
        // 検索対象のモノを表示
        const searching: UserType[] | null = await User.find(
            {username: {$regex: userSearchWord, $options: "i"}},
        ).exec()
        console.log(searching)
        return JSON.stringify(searching)
    } catch (err) {
        return null
    }
}
export default userSearch;