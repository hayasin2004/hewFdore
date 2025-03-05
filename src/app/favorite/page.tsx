"use client"
import React, {useEffect, useState} from 'react';
import "./favorite.css"
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Link from "next/link";
import {ProductType} from "@/app/utils/product/productDetail";
import useUser from "@/hooks/useUser";
import getFavoriteProductFunc from "@/app/utils/product/getFavoriteProductFunc";
import confirmUser from "@/app/utils/user/confirmUser";
import {UserType} from "@/app/api/user/catchUser/route";


const Favorite = () => {
    const [favoriteProductData, setFavoriteProductData] = useState<ProductType[] | null>(null)
    const [userData, setUserData] = useState<UserType | null>(null)
    console.log(userData)

    const [token, setToken] = useState<string | null>(null)

    const user = useUser(token)
    useEffect(() => {

        if (typeof window !== "undefined") {
            // Your code that accesses localStorage
            const data = localStorage.getItem("token");
            setToken(data)
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const confirmUserData = async () => {
                const response = await confirmUser(token)
                // console.log("バグったかも"+response)
                if (response !== undefined) {
                    const responseParse = JSON.parse(response!)
                    setUserData(responseParse)
                }
            }
            confirmUserData()
        }
    }, [user,token])

    useEffect(() => {

        const getFavoriteProduct = async () => {
            if (userData?._id !== undefined) {
                const response = await getFavoriteProductFunc(userData?._id)
                console.log(response)
                if (response == null) {
                    console.log("いいねした商品はありません")
                    window.alert("いいねした商品はありません")
                }
                if (response !== undefined) {
                    const responseParse = JSON.parse(response!)
                    setFavoriteProductData(responseParse)
                }
            }
        }
        getFavoriteProduct()
    }, [userData]);

    return (
        <>
            <Header/>
            <div id={"bread"}>
                <Link href={"/"}><p className={"breadText"}>F&apos;dore</p></Link>
                <p className={"breadArrow"}>＞</p>
                <Link href={"confirmUser"}><p className={"breadText"}>プロフィール</p></Link>
                <p className={"breadArrow"}>＞</p>
                <Link href={"/"}><p className={"breadText"}>お気に入り</p></Link>
            </div>
            <div className={"favorite"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-star">
                    <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <h1>お気に入りした商品一覧</h1>
            </div>
            <div className={"favorite_products"}>
                {favoriteProductData !== null ? favoriteProductData?.map((item) => (
                    <div key={item._id} className={"favorite_products"}>
                    <div className={"f_product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名 :{item.productName}
                            </p>
                            <p>出品者 : {item.sellerUserName}</p>
                            <p>価格 :　{item.productPrice}円</p>
                            <Link href={`/product/${item._id}`}>
                                <p id={"Plink"}>詳細</p>
                            </Link>
                        </div>
                    </div>
                </div>
                )) : <p id={"msg_noData"}>いいねした商品はありません。</p>}
                {/*テスト表示用*/}
            {/*    <div className={"f_product"}>*/}
            {/*    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>*/}
            {/*    <div className={"product_text"}>*/}
            {/*        <p>*/}
            {/*            商品名*/}
            {/*        </p>*/}
            {/*        <p>出品者 : xxxx</p>*/}
            {/*        <p>価格 : xxxx</p>*/}
            {/*        <Link href={`/`}>*/}
            {/*            <p className={"Plink"}>詳細</p>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*    <div className={"f_product"}>*/}
            {/*    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>*/}
            {/*    <div className={"product_text"}>*/}
            {/*        <p>*/}
            {/*            商品名*/}
            {/*        </p>*/}
            {/*        <p>出品者 : xxxx</p>*/}
            {/*        <p>価格 : xxxx</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*    <div className={"f_product"}>*/}
            {/*    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>*/}
            {/*    <div className={"product_text"}>*/}
            {/*        <p>*/}
            {/*            商品名*/}
            {/*        </p>*/}
            {/*        <p>出品者 : xxxx</p>*/}
            {/*        <p>価格 : xxxx</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            </div>
            <Footer/>
        </>
    );
}


export default Favorite;
