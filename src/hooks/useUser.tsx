"use client"
import React, {useEffect, useState} from 'react';
import confirmUser from "@/app/utils/confirmUser";

// ユーザー情報を取得するカスタムフックです
interface User {
    token: string | null;
    username: string;
    email: string;
    userId: string;
}

const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    // console.log(user?.email)
    const token = localStorage.getItem("token");
    const userId =  user?.userId

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
        },[token , userId]);
    //  useEffectの依存配列でtokenが変更されたのみ発火する
    return {user, token, userId: user?.userId, username: user?.username, email: user?.email}

}

export default useUser;