import React from 'react';
import Header from "@/app/_components/header/Header";
import "./payComplete.css"
import Link from "next/link";
const PayComplete = () => {

    return (
        <>
            <Header/>
            <main>
                <h2>お支払いが完了しました</h2>
                <p>ご購入ありがとうございました。<br/>
                    発送状況に関しては</p>
                <a href="#">xxxx</a>
                <p>をご確認ください。</p>

                <Link id="return" href={"toppage"}>TOPへ</Link>
            </main>
        </>
    );
}


export default PayComplete;