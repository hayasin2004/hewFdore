"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import confirmUser from "@/app/utils/user/confirmUser";
import Footer from "@/app/_components/footer/Footer";
import {loginUser} from "@/app/utils/user/loginUser";
import "./toppage.css"
// import Slideshow from "@/app/_components/toppageslideshow/Slideshow";
import ToppageProducts from "@/app/_components/toppageProduct/ToppageProducts";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";

import Image from "next/image"
import {color} from "@mui/system";
import Toppage_2nd from "@/app/_components/Toppage_2nd/Toppage_2nd";
import ToppageSite3 from "@/app/_components/toppage_site3/Toppage_site3";
import Blogintroduction from "@/app/_components/blog/Blogintroduction";
import axios from "axios";
import InsertProductSellStatus from "@/app/utils/setting/update/InserteUserPurchase";
import InsertProductImage from "@/app/utils/setting/update/InsertProudctImage";
import soldOutProduct from "@/app/utils/setting/update/soldOutProduct";
import toastPurchase from "@/app/utils/toast/toastPurchase";
import setupfollowerUserId from "@/app/utils/setting/update/setupfollowerUserId";
import updatePayPay from "@/app/utils/setting/update/updatePayPay";
// 幅揃えします

const Toppage = () => {

    const [productList, setProductList] = useState([])
    console.log(productList)

    const updateButton = async () => {
        await updatePayPay()
    }

    //
    // useEffect(() => {
    //     const insert = async () => {
    //      await  InsertProductImage()
    //     }
    //     insert()
    // }, []);

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
            <Blogintroduction/>
            <Header/>
            {/*<button onClick={updateButton}>更新</button>*/}
            <div className={"top"}>
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

                            <h2>F'dore</h2>
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
