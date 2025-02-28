"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import confirmUser from "@/app/utils/user/confirmUser";
import Footer from "@/app/_components/footer/Footer";
import "./toppage.css"
import ToppageProducts from "@/app/_components/toppageProduct/ToppageProducts";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";

import Image from "next/image"
import Toppage_2nd from "@/app/_components/Toppage_2nd/Toppage_2nd";
import ToppageSite3 from "@/app/_components/toppage_site3/Toppage_site3";
import axios from "axios";

const Toppage = () => {
    const [productList, setProductList] = useState([])
    console.log(productList)

   　


    useEffect(() => {
        // エンコードしたtokenを検証する
        const token = localStorage.getItem("token") as string;
        confirmUser(token);
        // console.log(token);
        // token.username
        // const username =
        const product = async () => {
            try {
                const response = await axios.get("/api/product");
                if (response.status === 200) {
                    setProductList(response.data);
                } else {
                    console.error("Error: Unable to fetch products.");
                }
            } catch (err) {
                console.log(err)
            }
        }
        product()
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        if (sessionId === "cancel") {
            localStorage.removeItem("isButtonDisabled");
        }
    }, []);


    return (
        <>
            <Header/>
            <div className={"top"}>
                <Toppage_top_slideshow/>
                {/*<Sidebar/>*/}
                <div className={"siteIntroduction"}>
                    <div className={"introduction"}>
                        <div className={"introductionMain"}>

                            <h1>F&apos;dore<span id={"smallFont"}> とは</span></h1>
                            <h3>F&apos;doreとは、女性向けに作られたファッション系フリマサイトです。主に衣服や香水。アクセサリーなどが数多く出品されています。</h3>
                            <h3>&quot;Female&quot;<span className={"smallFonth3"}> (女性) </span>、&quot;Door&quot;<span
                                className={"smallFonth3"}> (扉) </span>、&quot;Store&quot;<span
                                className={"smallFonth3"}> (お店) </span>の 3つの言葉から生まれた F&apos;dore<span
                                className={"smallFonth3"}>（フィードア）</span>には、特別な想いが込められています。新しい服との出会い、新しい自分との出会いになる。扉を開けて街へ出かけていく、そんな瞬間をサポートしたいという願いを込めて名付けられました。
                            </h3>
                            <h3>新しい服との出会いは、新しい自分との出会い。
                                F&apos;doreで、あなたらしいファッションとの素敵な出会いを見つけてください。</h3>
                        </div>
                    </div>
                </div>

                 <h2 style={{color: "red", fontSize: "6rem"}}></h2>
                <Toppage_2nd/>
                <ToppageSite3/>


                <div className={"toppageBottomPicture_Text"}>
                    <ul className={"toppageBottomUl"}>
                        <li className={"toppageBottomLi"}>


                            <Image src={"/images/clothes/toppagepicture.jpg"} className={"toppageBottomImage"}
                                   width={1920}
                                   height={1280} alt={"トップページ下の画像"}/>
                        </li>
                        <li className={"toppageBottomLi"}>

                            <h2>F&apos;dore</h2>
                        </li>
                    </ul>
                </div>
                {/*<Slideshow/>*/}
            </div>
            <ToppageProducts/>
            <Footer/>
        </>
    );
}


export default Toppage;
