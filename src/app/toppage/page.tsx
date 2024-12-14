"use client"
import React, {useEffect} from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import confirmUser from "@/app/utils/user/confirmUser";
import Footer from "@/app/_components/footer/Footer";
import {loginUser} from "@/app/utils/loginUser";
import "./toppage.css"
// import Slideshow from "@/app/_components/toppageslideshow/Slideshow";
import ToppageProducts from "@/app/_components/toppageProduct/ToppageProducts";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
import Toppage_2nd from "@/app/_components/Toppage_2nd/Toppage_2nd";

import Image from "next/image"
import {color} from "@mui/system";
// 幅揃えします

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
            <Toppage_top_slideshow/>
            {/*<Sidebar/>*/}
            <div className={"siteIntroduction"}>
                <div className={"introduction"}>
                    <div className={"introductionMain"}>

                        <h1>F'doreとは</h1>
                        <p>大人の女性の向けファッション</p>
                    </div>
                </div>
            </div>

            {/*<h2 style={{color: "red", fontSize: "6rem"}}>ここにスライド2</h2>*/}
            <Toppage_2nd/>
            <h3 style={{color: "yellowgreen", fontSize: "4rem"}}>ここにスライド3</h3>


            <div className={"toppageBottomPicture_Text"}>
                <ul className={"toppageBottomUl"}>
                    <li className={"toppageBottomLi"}>


                        <Image src={"/images/clothes/toppagepicture.jpg"} className={"toppageBottomImage"}
                               width={1920}
                               height={1280} alt={"トップページ下の画像"}/>
                    </li>
                    <li className={"toppageBottomLi"}>

                        <h2>F'dore</h2>
                    </li>
                </ul>
            </div>
            {/*<Slideshow/>*/}
            {/*</div>*/}
            <ToppageProducts/>

            <Footer/>
        </>
    );
}


export default Toppage;
