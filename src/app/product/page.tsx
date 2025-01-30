import React from 'react';
import Image from "next/image"
import "./[id]/product.css"
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Link from 'next/link';
import Sidebar from "@/app/_components/sidebar/Sidebar";
import Chat from "@/app/_components/chat/Chat";



const Product = () => {

    return (
        <>
            <Header/>
            <main className={"productMainDisplay"}>
                <div className={"productCart"}>
                <Sidebar/>
                </div>


                <div className="productMain">
                    <div id="info">
                        <div id="photo">
                            <figure>
                                <Image src="/images/clothes/product9.jpg" width={200} height={200} alt="商品の写真"/>
                            </figure>
                            <ul className="piclist">
                                <li className="picts"><a href="/images/clothes/product9.jpg">
                                    <figure>
                                        <Image src="/images/clothes/product9.jpg" width={50} height={50}
                                               alt="商品の写真"/>
                                    </figure>
                                </a>
                                </li>
                            </ul>
                        </div>
                        <div id="text">
                            <h1>ニット</h1>
                            <span className="under_bar"></span>
                            <a href="#" id="seller">
                                <h2>出品者:
                                </h2>

                                <h2>Yuuna</h2>
                            </a>
                            <p>
                                商品詳細<br/>
                                去年の冬に入って購入したものになります。<br/>

                            </p>
                            <p id="size">サイズ:S</p>
                            <p id="used">商品状態:多少使用感がある</p>
                            <p id="postage">送料:出品者負担</p>
                            <p id="category">カテゴリ: ニット Sサイズ 春物 色</p>
                        </div>
                    </div>
                    <Chat/>
                    <div id="controlProduct">
                        <Image width={30} height={30} src="/images/star_8.png " alt="お気に入りアイコン"/>
                        <Image width={30} height={30} src="/images/Cart_icon.png" alt="カート"/> <br/>
                        <Link href={"sendAddress"}>

                        <button id={"buy"}
                            type="button" className={"productPurchase"}>購入する
                        </button>
                        </Link>
                    </div>



                </div>

            </main>
            <Footer/>
        </>
    );
}


export default Product;
