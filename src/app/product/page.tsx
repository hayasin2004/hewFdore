import React from 'react';
import Image from "next/image"
import "./product.css"
import Header from "@/app/_components/header/Header";
import Chat from "@/app/_components/chat/Chat";
import Footer from "@/app/_components/footer/Footer";
import Images from "next/image";
import Link from 'next/link';


const Product = () => {

    return (
        <>
            <Header/>
            <main>
                <div className="productCart">

                    <div id={"cartText"}>
                        <h2>Cart</h2>
                        <Image src="/images/Cart_icon.png" width={50} height={50} alt="カート" className="icon"/>
                    </div>
                    <span className="under_bar"></span>
                    <div className="innerCart">
                        <figure>
                            <Image src="/images/clothes/product9.jpg" width={200} height={200} id={"sumImg"} alt="商品の写真"/>
                        </figure>
                        <p>
                            <p>ニット</p>
                            <p>出品者:Yuuna</p>
                            <p>価格:2800</p>
                        </p>

                    </div>
                    <p>合計金額</p>
                    <p id="total">2800円</p>
                </div>



                <div className="productMain">
                    <div id="info">
                        <div id="photo">
                            <figure>
                                <Image src="/images/clothes/product9.jpg" width={400} height={400} alt="商品の写真"/>
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

                    <div id="controlProduct">
                        <Image width={30} height={30} src="/images/star_8.png " alt="お気に入りアイコン"/>
                        <Image width={30} height={30} src="/images/Cart_icon.png" alt="カート"/> <br/>
                        <Link href={"sendAddress"}>

                        <button id={"buy"}
                            type="button">購入する
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
