"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import confirmUser from "@/app/utils/confirmUser";
import {loginUser} from "@/app/utils/loginUser";

interface User {
    username?: string,
    useId?: string
}

const Toppage = () => {
    const [user, setUser] = useState<string>({})
    console.log(user.username)
    console.log(user.userId)
    console.log(user.email)
    // ↑これで今ログインしているユーザーの情報を取得
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                const userData = await confirmUser(token);
                console.log(userData)
                setUser(userData)
                if (userData !== null) {
                    setUser(userData)
                } else {
                    console.log("トークンが確認できませんでした。")
                }
            })()
        }
        // エンコードしたtokenを検証する


    }, []);


    return (
        <div>
            <Header/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Sidebar/>
                <ToppageMain/>
            </div>
        </div>
    );
}


export default Toppage;
