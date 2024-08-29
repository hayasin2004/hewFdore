import Header from '@/app/_components/header/Header';
import React from 'react';
import "./sendAddress.css"
import Image from "next/image";
import Link from "next/link";

const SendAddress = () => {

    return (
        <>
            <Header/>
            <main>
                <h2>ご購入される商品</h2>
                <div className="goods">
                    <Image src="/images/sample01.jpg" height="919" width="640" alt="商品サムネイル"/>
                    <div id="goods">
                        <h3>ニット上着</h3>
                        <p id="UserName">出品者:User02 </p>
                        <p>
                            サイズ:S
                            使用状況:多少使用感がある <br/>
                            カテゴリ:上着 ニット素材 白色 Sサイズ
                        </p>
                        <p>送料: 出品者負担</p>
                        <p>2~3日で発送</p>
                    </div>
                </div>
                <div id="price">
                    <p>
                        商品代金 5000 円 <br/>
                        送料 0 円
                    </p>
                    <h3 id="totalprice">
                        合計 5000 円
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
                        <label htmlFor="FamilyName"> 姓 </label><label htmlFor="FirstName">名</label>
                        <input type="text" name="FamilyName" id="FamilyName" placeholder="苗字"/>
                        <input type="text" name="FirstName" id="FirstName" placeholder="名前"/>
                    </div>
                    <div className="Name">
                        <label htmlFor="FamilyName_kana">フリ</label><label htmlFor="FirstName_kana">ガナ</label>
                        <input type="text" name="FamilyName" id="FamilyName_kana" placeholder="ミョウジ"/>
                        <input type="text" name="FirstName" id="FirstName_kana" placeholder="ナマエ"/>
                    </div>
                    <p>住所</p>
                    <div>
                        <label htmlFor="postcode">郵便番号</label>
                        <input type="text" name="postcode" id="postcode" placeholder="ハイフンなし　半角"/>
                        <button type="button" id="Post">記入</button>
                        <div id="comment"></div>
                        <br/>
                        <label htmlFor="prefecture">都道府県</label>
                        <input type="text" name="prefecture" id="prefecture"/> <br/>
                        <label htmlFor="city">市区町村</label>
                        <input type="text" name="city" id="city"/> <br/>
                        <label htmlFor="number"> 番 地</label>
                        <input type="text" name="number" id="number"/>
                    </div>
                    <p>緊急連絡先</p>
                    <div>
                        <label htmlFor="telnumber">電話番号</label> <br/>
                        <input type="tel" name="telnumber" id="telnumber" placeholder="ハイフンなし　半角"/> <br/>
                        <label htmlFor="Email">メールアドレス</label> <br/>
                        <input type="email" name="Email" id="Email"/>
                    </div>

                </form>
                <div className={"control_button"}>

                    <Link href={"../Toppage/index.html"}>
                        <button>戻る</button>
                    </Link>
                    <button type="submit" form="address">支払い画面へ</button>
                </div>
            </main>
        </>
    );
}


export default SendAddress;