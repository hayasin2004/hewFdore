"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import "../payComplete.css"
import Link from "next/link";
import {useSearchParams} from 'next/navigation'
import io from "socket.io-client";
import useUser from "@/hooks/useUser";

const PayComplete = () => {

    const [params, setParams] = useState({});
    console.log(params?.sessionId)
    const {user} = useUser()
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        const productId = query.get('productId');
        const userId = user?.userId
        console.log(userId)
        setParams({sessionId, productId});
        if (userId)
            if (sessionId || productId || userId) {
                console.log("成功" + sessionId)
                console.log("成功" + productId)
                console.log("成功" + userId)
            } else {
                console.log("ゾンビ")
            }

    }, [user]);
    // const productId = decodeURI(params.productId);
    // console.log(productId);


    // useEffect(() => {
    //     const getProductId = searchParams.get("productId");
    //
    //         console.log(getProductId);
    // }, [searchParams]);

    return (
        <>
            <Header/>
            <main>
                <h2 className={"Pcon"}>お支払いが完了しました</h2>
                <p className={"Pcon"}>ご購入ありがとうございました。<br/>
                    お取引の連絡はご登録のメールアドレスに届きます。</p>
                <Link id="return" href={"chat"}>
                    取引画面
                </Link>
            </main>
        </>
    );
}


export default PayComplete;