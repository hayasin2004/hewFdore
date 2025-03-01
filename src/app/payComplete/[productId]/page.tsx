"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import "../payComplete.css"
import Link from "next/link";
import useUser from "@/hooks/useUser";
import payComplete from "@/app/utils/product/payComplete";

interface ParamsType {
    sessionId: string | null;
    productId: string | null;
}


const PayComplete = () => {
    const [productId, setProductId] = useState<string | null>("")
    console.log(productId)
    const [params, setParams] = useState<ParamsType | null>(null);
    const [loginUserData, setLoginUserData] = useState()

    console.log(loginUserData, params?.sessionId);
    console.log(loginUserData, params?.sessionId)

    const token = localStorage.getItem("token");
    const user = useUser(token)
    const userParse = JSON.parse(user)
    useEffect(() => {
        setLoginUserData(userParse)
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        const productId = query.get('productId');
        const paymentStatus = query.get('paymentStatus')

        const userId = query.get('userId');
        console.log(sessionId, productId)
        setParams({sessionId, productId});
        if (userId) {
            if (sessionId || productId || userId) {
                console.log(productId, sessionId, userId)

                const insertPurchaseDate = async () => {
                    const response = await payComplete(productId, sessionId, userId, paymentStatus)
                    if (response !== null) {
                        setProductId(JSON.parse(response))
                    }
                }
                insertPurchaseDate()
            } else {
                console.log("ゾンビ")
            }
        }
    }, [userParse]);
    // const productId = decodeURI(params.productId);
    // console.log(productId);


    // useEffect(() => {
    //     const getProductId = searchParams.get("productId");
    //
    //         console.log(getProductId);
    // }, [searchParams]);

    // const productData = {
    //     productId : product?._id,
    //     sellerId : product?.sellerId,
    //     buyerId :  product?.buyerId,
    //     productPrice : product?.productPrice,
    //     productName : product?.productName,
    //     productDesc : product?.productDesc,
    //     productSize : product?.productSize,
    //     productCondition : product?.productCondition,
    //     productCategory: product?.productCategory
    // }
    //
    // const query = new URLSearchParams(productData).toString();

    return (
        <>
            <Header/>
            <main>
                <h2 className={"PconH2"}>お支払いが完了しました</h2>
                <p className={"PconP"}>ご購入ありがとうございました。<br/>
                    お取引の連絡はご登録のメールアドレスに届きます。</p>
                <Link id="return" href={`/tradeChat/${productId}`}>
                    取引画面
                </Link>
            </main>
        </>
    );
}


export default PayComplete;