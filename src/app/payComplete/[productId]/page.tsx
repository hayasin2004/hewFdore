"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import "../payComplete.css"
import Link from "next/link";
import {useSearchParams} from 'next/navigation'
import io from "socket.io-client";
import useUser from "@/hooks/useUser";
import payComplete from "@/app/utils/product/payComplete";
import UpdateProductLikeList from "@/app/utils/setting/update/UpdateProductLikeList";

const PayComplete = () => {
    const [productId, setProductId] = useState<string | null>("")
    console.log(productId)
    const [params, setParams] = useState({});
    console.log(params?.sessionId)
    const {user} = useUser()
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        const productId = query.get('productId');
        const userId = query.get('userId');
        console.log(userId)
        setParams({sessionId, productId});
        if (userId) {
            if (sessionId || productId || userId) {
                console.log(productId,sessionId, userId)
                const insertPurchaseDate = async  () => {
                    const response = await payComplete(productId,sessionId, userId)
                    if (response !== undefined || response !== null){
                        setProductId(JSON.parse(response))
                    }
                }
                insertPurchaseDate()
            } else {
                console.log("ゾンビ")
            }
        }
    }, []);
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
                <h2 className={"Pcon"}>お支払いが完了しました</h2>
                <p className={"Pcon"}>ご購入ありがとうございました。<br/>
                    お取引の連絡はご登録のメールアドレスに届きます。</p>
                <Link id="return" href={`/tradeChat/${productId}`}>
                    取引画面
                </Link>
            </main>
        </>
    );
}


export default PayComplete;