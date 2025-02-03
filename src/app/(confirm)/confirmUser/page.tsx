"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import "./confirmUser.css"
import Image from "next/image"
import Link from 'next/link';
import purchaseProduct from "@/app/utils/product/purchaseProduct";
import {ProductType} from "@/app/utils/product/productDetail";
import {UserType} from "@/app/api/user/catchUser/route";
import useUser from "@/hooks/useUser";

const ConfirmUserProfile = () => {
    const [purchaseData, setPurchaseData] = useState([])
    const [productData, setProductData] = useState<ProductType[] | null>(null)
    const [loginUserData, setLoginUserData] = useState<UserType | null>(null)

    const user = useUser()
    console.log(loginUserData)
    useEffect(() => {

        const userParse = JSON.parse(user)
        console.log("userParse" + userParse)
        setLoginUserData(JSON.parse(userParse))
        if (userParse) {
        }
    }, [user]);

    useEffect(() => {
        const fetchPurchaseProduct = async () => {
            const response = await purchaseProduct(loginUserData)
            console.log(response)
            if (response == null) {
                console.log("購入した商品はありません。")
            }
            if (response?.purchaseProduct !== undefined) {
                setPurchaseData(JSON.parse(response?.purchaseProduct))
            }
            if (response?.product !== undefined) {
                setProductData(JSON.parse(response?.product))
            }
            console.log(response)
        }
        fetchPurchaseProduct()
        console.log("いまきた")
    }, [loginUserData]);
    return (
        <>
            <Header/>
            <main id={"CUmain"}>
                <div id={"confirms"}>

                    <Link href={"confirmPoints"}>
                        <div className={"confirm"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-badge-russian-ruble">
                                <path
                                    d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                                <path d="M9 16h5"/>
                                <path d="M9 12h5a2 2 0 1 0 0-4h-3v9"/>
                            </svg>
                            <div className={"confirm_text"}>
                                <p>現在の保持ポイント</p>
                                <p id={"getPoint"}>10pt</p>
                                <p id={"pointHst"}>獲得履歴を見る</p>
                            </div>
                        </div>
                    </Link>

                    <Link href={"favorite"}>
                        <div className={"confirm"} id={"fav"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-star">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            <div className={"confirm_text"}>
                                <p>お気に入り</p>
                            </div>
                        </div>
                    </Link>
                    <Link href={"updateProfile"}>

                        <div className={"confirm"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-user-cog">
                                <circle cx="18" cy="15" r="3"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M10 15H6a4 4 0 0 0-4 4v2"/>
                                <path d="m21.7 16.4-.9-.3"/>
                                <path d="m15.2 13.9-.9-.3"/>
                                <path d="m16.6 18.7.3-.9"/>
                                <path d="m19.1 12.2.3-.9"/>
                                <path d="m19.6 18.7-.4-1"/>
                                <path d="m16.8 12.3-.4-1"/>
                                <path d="m14.3 16.6 1-.4"/>
                                <path d="m20.7 13.8 1-.4"/>
                            </svg>
                            <div className={"confirm_text"}>
                                <p>ユーザー情報を変更</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={"rightbar"}>
                    <h2>購入履歴</h2>
                    <div className={"rightbar_flex"}>
                        <div className={"rightbar_product"}>
                            {productData?.map((item) => (
                                <div key={item._id} className={"rightbar_product_text"}>
                                    <Image src={item.productImage !== undefined ? item.productImage : ""} width={200}
                                           height={200}
                                           alt={"購入履歴"}/>
                                    <p>
                                        商品名 : {item.productName}
                                    </p>
                                    <p>出品者 : {item.sellerUserName}</p>
                                    <p>価格 : {item.productPrice}</p>
                                    <Link href={`/product/${item._id}`}>
                                        <p>詳細</p>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/*<div className={"rightbar_flex"}>*/}
                    {/*    <div className={"rightbar_product"}>*/}
                    {/*        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>*/}
                    {/*        <div className={"rightbar_product_text"}>*/}
                    {/*            <p>*/}
                    {/*                商品名*/}
                    {/*            </p>*/}
                    {/*            <p>出品者 : xxxx</p>*/}
                    {/*            <p>価格 : xxxx</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                </div>
            </main>
            <Footer/>
        </>
    )
        ;
}


export default ConfirmUserProfile;
