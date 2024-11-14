import Header from '@/app/_components/header/Header';
import React from 'react';
import "./sendAddress.css"
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/_components/footer/Footer";

const SendAddress = () => {

    return (
        <>
            <Header/>
            <main >
                <h2>ご購入される商品</h2>
                <div className="goods">
                    <Image src="/images/clothes/product9.jpg" height="919" width="640" alt="商品サムネイル"/>
                    <div id="goods">
                        <h3>ニット</h3>
                        <p id="UserName">出品者:Yuuna </p>
                        <p>
                            サイズ:S
                            商品状態:多少使用感がある <br/>
                            カテゴリ:上着 ニット素材 白色 Sサイズ
                        </p>
                        <p>送料: 出品者負担</p>
                        <p>2~3日で発送</p>
                    </div>
                </div>
                <div id="price">
                    <p>
                        商品代金 2800 円 <br/>
                        送料 0 円
                    </p>
                    <h3 id="totalprice">
                        合計 2800 円
                    </h3>

                </div>
                <form action="pay_confirm.html" id="address">

                    <p>お届け先</p>
                    <div className="check">
                        <input type="radio" name="address_set" id="users" value="users"/>
                        <label htmlFor="users">登録された住所に送る</label>
                    </div>
                    <div className="check">
                        <input type="radio" name="address_set" id="write" value="write"/>
                        <label htmlFor="write">記入する</label>
                    </div>
                    <div className="Name">
                        <label htmlFor="FamilyName"> 姓 </label><label htmlFor="FirstName"
                                                                       className={"threespace"}>名</label>
                        <input type="text" name="FamilyName" id="FamilyName" placeholder="苗字"/>
                        <input type="text" name="FirstName" id="FirstName" placeholder="名前"/>
                    </div>
                    <div className="Name">
                        <label htmlFor="FamilyName_kana">フリ</label><label htmlFor="FirstName_kana"
                                                                            className={"twospace"}>ガナ</label>
                        <input type="text" name="FamilyName" id="FamilyName_kana" placeholder="ミョウジ"/>
                        <input type="text" name="FirstName" id="FirstName_kana" placeholder="ナマエ"/>
                    </div>
                    <p className={"middletext"}>住所</p>
                    <div>
                        <label htmlFor="postcode" className={"onespace"}>郵便番号</label>
                        <input type="text" name="postcode" id="postcode" placeholder="ハイフンなし　半角"/>
                        <button type="button" id="Post">記入</button>
                        <div id="comment"></div>
                        <br/>
                        <label htmlFor="prefecture" className={"onespace"}>都道府県</label>
                        <input type="text" name="prefecture" id="prefecture"/> <br/>
                        <label htmlFor="city" className={"onespace"}>市区町村</label>
                        <input type="text" name="city" id="city"/> <br/>
                        <label htmlFor="number" className={"threespace"}> 番 地</label>
                        <input type="text" name="number" id="number"/>
                    </div>
                    <p className={"middletext"}>連絡先</p>
                    <div>
                        <label htmlFor="telnumber">電話番号</label> <br/>
                        <input type="tel" name="telnumber" id="telnumber" placeholder="ハイフンなし　半角"/> <br/>
                        <label htmlFor="Email">メールアドレス</label> <br/>
                        <input type="email" name="Email" id="Email"/>
                    </div>

                </form>
                <div className={"control_button"}>

                    <Link className={"button"} href={"/toppage"}>
                        <button>戻る</button>
                    </Link>
                    <button id={"ToPay"} form="">
                        <Link  className={"button"}  href={"confirmPayment"}>
                            支払い画面へ
                        </Link>
                    </button>
                </div>
            </main>
            <Footer/>
        </>
    );
}


export default SendAddress;