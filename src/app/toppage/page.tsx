"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import confirmUser from "@/app/utils/confirmUser";
import {loginUser} from "@/app/utils/loginUser";


const Toppage = () => {
    const [user, setUser] = useState("")
    console.log("adfsadsfads"+ user)
    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        if (token) {
            (async () => {
                const userData = await confirmUser(token);
                setUser(userData)
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
