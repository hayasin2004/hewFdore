"use client"
import React, {useEffect} from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import confirmUser from "@/app/utils/confirmUser";
import Footer from "@/app/_components/footer/Footer";
import {loginUser} from "@/app/utils/loginUser";
import "./toppage.css"
import Slideshow from "@/app/_components/toppageslideshow/Slideshow";
import ToppageProducts from "@/app/_components/toppageProduct/ToppageProducts";

const Toppage = () => {
    useEffect(() => {
        // エンコードしたtokenを検証する
        const token = localStorage.getItem("token") as string;
        confirmUser(token);
        // console.log(token);
        // token.username
        // const username =
    }, []);


    return (
        <>
            <div className={"toppageVideo"}>

                <video src="/videos/background3.mp4" width={700} height={1080} autoPlay muted loop></video>
            </div>
            <Header/>
            {/*<div className={"toppage"}>*/}
                <Sidebar/>
                <Slideshow/>
            {/*</div>*/}
            <ToppageProducts/>

            <Footer/>
        </>
    );
}


export default Toppage;
