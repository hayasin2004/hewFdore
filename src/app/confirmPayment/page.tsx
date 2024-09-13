import React from 'react';
import "./confirmpayment.css"
import Image from "next/image"
import Link from "next/link";
import Header from "@/app/_components/header/Header";


const ConfirmPayment = () => {

    return (
        <>
            <Header />
            <div className="main">


                <p>お支払方法の確認</p>
                <form id="card">
                    <h3>カード支払い</h3>
                    <div id="form_main">
                        <div id="Clabel">
                            <label htmlFor="cNumber">カード番号</label>
                            <label htmlFor="cLimit">有効期限(月/日)</label>
                            <label htmlFor="cName">カード名義</label>
                            <label htmlFor="pinCode">PINコード</label>
                        </div>
                        <div id="input">
                            <input type="text" name="cNumber" id="cNumber"/>
                            <input type="month" name="cLimit" id="cLimit"/>
                            <input type="text" name="cName" id="cName"/>
                            <input type="password" name="pinCode" id="pinCode"/>
                        </div>
                    </div>
                </form>
                <div id="checkCart">
                    <h3>商品の確認</h3>
                    <div className="cartGoods">
                        <Image src="/images/clothes/product9.jpg" width={400} height={400} alt="商品の写真"/>

                        <p><span style={{textDecoration: "underline"}}>ニット</span> <br/>
                            出品者:Yuuna<br/>
                            価格:2800 円</p>
                    </div>

                </div>
                <div id="totalprice">
                    <h3>ご購入金額</h3>
                    <p>2800円</p>
                    <h3>内 送料</h3>
                    <p>0円</p>
                </div>
                <div style={{width :"100px" , marginLeft : "260px"}}>
                    <button className={"completePay"} type="submit" form="card">
                        <Link href={"payComplete"}>
                            お支払い内容を確定する
                        </Link>
                    </button>
                </div>
                <button id="return">
                    <Link href={"sendAddress"}>
                        戻る
                    </Link>

                </button>


            </div>
        </>
    );
}


export default ConfirmPayment;
