"use server"

import {UserType} from "@/app/api/user/catchUser/route";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";

const userSearch = async (userSearchWord: string | null): Promise<string | null> => {
    await connectDB()
    const KatakanaHenkan = (userSearchWord: string | null) => {
        return userSearchWord?.replace(/[\u3041-\u3096]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) + 0x60)
        })
    }
    const HiraganaHenkan = (userSearchWord: string | null) => {
        return userSearchWord?.replace(/[\u30a1-\u30f6]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) - 0x60)
        })
    }
    try {
        if (userSearchWord === null) {
            console.log("文字を入力してください")
            return null
        }
        const NormalizationWordKatakana = KatakanaHenkan(userSearchWord)
        const NormalizationWordHiragana = HiraganaHenkan(userSearchWord)

        if (userSearchWord === null) {
            console.log("文字を入力してください")
            return null
        }

        await console.log("個々のログ出てる？" + userSearchWord)
        console.log(NormalizationWordKatakana)

        // 検索対象のモノを表示
        if (NormalizationWordKatakana !== undefined && NormalizationWordHiragana !== undefined) {

            const searching: UserType[] | null = await User.find({
                    $or: [
                        {username: {$regex: new RegExp(NormalizationWordKatakana, "i")}},
                        {username: {$regex: new RegExp(NormalizationWordHiragana, "i")}},
                    ]
                }
            ).exec()
            console.log(searching)
            return JSON.stringify(searching)
        }
    } catch (err) {
        return null
    }
}
export default userSearch;