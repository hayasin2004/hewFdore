import React from 'react';
import Header from "@/app/_components/header/Header";
import "./confirmUser.css"
import Image from "next/image"
import Link from 'next/link';

const ConfirmUserProfile = () => {

    return (
        <>
        <Header/>
        <span id={"btn"}>
                <button>
                    <Link href={"toppage"}>

                    戻る
                    </Link>
                </button>
            </span>
        <div style={{display: "flex"}}>
            <div>

                <Link href={"confirmPoints"}>
                    <div className={"confirm"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-badge-russian-ruble">
                            <path
                                d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                            <path d="M9 16h5"/>
                            <path d="M9 12h5a2 2 0 1 0 0-4h-3v9"/>
                        </svg>
                        <div className={"confirm_text"}>
                            <p>現在の保持ポイント 10 pt</p>
                            <p>獲得履歴を見る</p>
                        </div>
                        <hr/>
                    </div>
                </Link>

                <Link href={"favorite"}>
                    <div className={"confirm"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-star">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <div>
                            <p>お気に入り</p>
                        </div>
                    </div>
                </Link>
                <Link href={"updateProfile"}>

                    <div className={"confirm"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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

                        <p>ユーザー情報を変更</p>
                    </div>
                </Link>
            </div>


        <div className={"rightbar"}>
            <h2>購入履歴</h2>
            <div className={"rightbar_flex"}>
                <div className={"rightbar_product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"rightbar_product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>

            </div>
            <div className={"rightbar_flex"}>
                <div className={"rightbar_product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"rightbar_product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>

            </div>
            <div className={"rightbar_flex"}>
                <div className={"rightbar_product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"rightbar_product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>

            </div>
        </div>
        </div>
</>
)
    ;
}


export default ConfirmUserProfile;
