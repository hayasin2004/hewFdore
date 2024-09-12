import React from 'react';
import "./confirmpayment.css"
import Image from "next/image"
import Link from "next/link";


const ConfirmPayment = () => {

    return (
        <>
            <div className="main">


                <h2>お支払方法の確認</h2>
                <form id="card" action="pay_complete.html">
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
                        <Image src={"/images/sample01.jpg"} width={200} height={200} alt="商品サムネイル1"/>
                        <p><span style={{textDecoration: "underline"}}>ニット上着</span> <br/>
                            出品者:User02 さん<br/>
                            価格:5000 円</p>
                    </div>

                </div>
                <div id="totalprice">
                    <h3>ご購入金額</h3>
                    <p>5000円</p>
                    <h3>内 送料</h3>
                    <p>0円</p>
                </div>
                <button type="submit" form="card">
                    <Link href={"payComplete"}>
                        お支払い内容を確定する
                    </Link>
                </button>
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
