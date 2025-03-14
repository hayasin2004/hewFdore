"use client"
import  {useEffect, useState} from 'react';
import confirmUser from "@/app/utils/user/confirmUser";

// ユーザー情報を取得するカスタムフックです
export interface useUser {
    _id?: string;
    token?: string
    username?: string;
    email?: string;
    userId?: string;
    profilePicture? : string;
}

const useUser = (token : string| null) => {
    const [user, setUser] = useState<string | null | undefined>(null)
    // console.log(user?.email)


    useEffect(() => {
        if (token) {
            (async () => {
                const userData   = await confirmUser(token);
                // console.log(userData)
                    setUser(userData)
                    console.log("ト?ークンが確認できませんでした。")
                    return JSON.stringify(userData)
            })()
        }
        // 副作用　→　起爆のタイミングを設定
        },[token]);
    //  useEffectの依存配列でtokenが変更されたのみ発火する
    return JSON.stringify(user)
}

export default useUser;