import React from 'react';
import Image from "next/image"
import "./product.css"
import Header from "@/app/_components/header/Header";
import Chat from "@/app/_components/chat/Chat";


const Product = () => {

    return (
        <>
            <Header />
            <main>
                <div id="cart">

                    <div id={"cartText"}>
                    <h2>Cart</h2>
                    <Image src="/images/Cart_icon.png" width={50} height={50}  alt="カート" className="icon"/>
                    </div>
                    <span className="under_bar"></span>
                    <div className="innerCart">
                        <Image width={120} height={120} src="/images/sample01.jpg" alt="カート内画像"/>

                        <p>
                            <span className="title">商品名</span> <br/>
                            出品者 <br/>
                            価格
                        </p>

                    </div>
                    <p>合計金額</p>
                    <p id="total">5000円</p>
                </div>
                <div id="product">
                <div id="info">
                        <div id="photo">
                            <Image src="/images/sample01.jpg" width={400} height={400} alt="サンプル" id="sum"/>
                            <ul className="piclist">
                                <li className="picts"><a href="/images/sample01.jpg">
                                    <Image className="pictS" src="/images/sample01.jpg" width={50} height={50}  alt="画像1"/></a></li>
                                <li className="picts"><a href="/images/pic_fish.jpg"><Image
                                    className="pictS" src="/images/pic_fish.jpg"  width={50} height={50}  alt="画像1"/></a>
                                </li>
                            </ul>
                        </div>
                        <div id="text">
                            <h1>商品名</h1>
                            <span className="under_bar"></span>
                            <a href="#" id="seller"><h2>出品者:User01</h2>
                                <Image  width={23} height={2}  src="/images/pic_car.jpg" alt="icon"/>
                            </a>
                            <p>
                                商品詳細がここに入ります。<br/>
                                この部分は出品者が書くテキストです。<br/>
                                手放す理由、手触りや重さなどを書いてください。
                            </p>
                            <p id="size">サイズ:S</p>
                            <p id="used">使用状況:多少使用感がある</p>
                            <p id="postage">送料:出品者負担</p>
                            <p id="category">カテゴリ: ワンピース Sサイズ 春物 色</p>
                        </div>
                    </div>
                    <Chat />

                    <div id="control">
                        <Image width={30} height={30} src="/images/star_8.png " alt="お気に入りアイコン"/>
                        <Image width={30} height={30} src="/images/Cart_icon.png" alt="カート"/> <br/>
                        <button
                            type="button">購入する
                        </button>
                    </div>

                </div>


            </main>
        </>
    );
}


export default Product;
