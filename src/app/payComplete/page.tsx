import React from 'react';
import Header from "@/app/_components/header/Header";
import "./payComplete.css"
import Link from "next/link";
const PayComplete = () => {

    return (
        <>
            <Header/>
            <main>
                <h2 className={"Pcon"}>お支払いが完了しました</h2>
                <p className={"Pcon"}>ご購入ありがとうございました。<br/>
                    お取引の連絡はご登録のメールアドレスに届きます。</p>
                <Link  id="return" href={"chat"}>
                取引画面
                </Link>
            </main>
        </>
    );
}


export default PayComplete;