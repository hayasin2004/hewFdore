"use client"
import React, {useEffect} from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import confirmUser from "@/app/utils/confirmUser";
import {loginUser} from "@/app/utils/loginUser";

const Toppage = () => {
    useEffect(() => {
        // エンコードしたtokenを検証する
        const token = localStorage.getItem("token") as string;
        confirmUser(token);
        // console.log(token);
        // token.username
        const username =
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
