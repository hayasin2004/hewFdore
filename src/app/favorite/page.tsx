import React from 'react';
import "./favorite.css"
import Image from "next/image";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Link from "next/link";

const Favorite = () => {

    return (
        <>
            <Header/>
            <span id={"btn"}>

                    <Link href={"toppage"}>
                    <button>戻る</button>

                    </Link>
            </span>
            <div className={"favorite"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-star">
                    <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <h1>お気に入りした商品一覧</h1>
            </div>
            <div className={"favorite_products"}>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
            </div>
            <div className={"favorite_products"}>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
            </div>
            <div className={"favorite_products"}>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
                <div className={"product"}>
                    <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                    <div className={"product_text"}>
                        <p>
                            商品名
                        </p>
                        <p>出品者 : xxxx</p>
                        <p>価格 : xxxx</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}


export default Favorite;
