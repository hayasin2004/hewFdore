"use client"
import React, {useEffect, useState} from 'react';
import confirmUser from "@/app/utils/user/confirmUser";

// ユーザー情報を取得するカスタムフックです
export interface useUser {
    _id?: string;
    token?: string | null;
    username?: string;
    email?: string;
    userId?: string;
    profilePicture? : string;
}

const useUser = () => {
    const [user, setUser] = useState<useUser | null>(null)
    // console.log(user?.email)
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            (async () => {
                const userData = await confirmUser(token);
                // console.log(userData)
                if (userData !== null) {
                    setUser(userData)
                } else {
                    console.log("トークンが確認できませんでした。")
                    return null
                }
            })()
        }
        // 副作用　→　起爆のタイミングを設定
        },[token]);
    //  useEffectの依存配列でtokenが変更されたのみ発火する
    return {user}
}

export default useUser;