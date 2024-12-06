import React from 'react';
import Header from "@/app/_components/header/Header";
import "./confirmPoints.css"
import Image from "next/image"
import Link from "next/link";

const ConfirmUserProfile = () => {

    return (
        <>
            <Header/>
            <span id={"btn"}>

                    <Link href={"confirmUser"}>
                    <button>

                    戻る
                    </button>
                    </Link>
            </span>
            <div style={{display: "flex"}}>
                <div>

                    <div className={"confirmPointMain"}>
                        <div className={"confirmPoint"}>

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
                                <p>現在の保持ポイント xxxx pt</p>
                                <p>獲得履歴を見る</p>
                            </div>
                        </div>

                        <div className={"recommend_products"}>
                            <h2>あなたにおすすめの商品</h2>
                            <div className={"recommend_product"}>

                                <div className={"product"}>
                                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                                    <div className={"rightbar_product_text"}>
                                        <p>
                                            商品名
                                        </p>
                                        <p>出品者 : xxxx</p>
                                        <p>価格 : xxxx</p>
                                    </div>
                                </div>
                                <div className={"product"}>
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

                </div>


                <div className={"rightbarPoint"}>
                    <h2>ポイント獲得履歴</h2>
                    <div className={"rightbar_note"}>
                        <div>
                            <ul className={"rightbar_collectpoint"}>
                                <li>獲得元</li>
                                <li>獲得ポイント</li>
                            </ul>
                        </div>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                        <ul className={"rightbar_point"}>
                            <li>xxadfasdf</li>
                            <li>yyyy</li>
                        </ul>
                    </div>
                </div>

            </div>

        </>
    );
}


export default ConfirmUserProfile;
