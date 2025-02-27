"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {stripePaymentFunc} from '@/app/utils/stripe/stripePaymentFunc';
import {stripePaymentPayPay} from "@/app/utils/stripe/paypaystripe";
import useUser from "@/hooks/useUser";
import {UserType} from "@/app/api/user/catchUser/route';
import io from "socket.io-client";
import "./stripe.css"
import Image from "next/image"

export interface CompleteStripeType {
    productId?: string;
    sellingOrSoldOut?: string;
}

const CompleteStripe = ({productId, sellingOrSoldOut}: CompleteStripeType) => {
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [loginNowUserData, setLoginNowUserData] = useState<UserType | undefined>(undefined)
    const [sellingOrSoldOutStatus, setSellingOrSoldOutStatus] = useState<string>("")
    console.log("sellingOrSoldOutStatus" + sellingOrSoldOutStatus, "sellingOrSoldOut" + sellingOrSoldOut)
    console.log(loginNowUserData?._id)
    const [isButtonDisabled, setIsButtonDisabled] = useState(() => {
        const status = localStorage.getItem("isButtonDisabled")
        return status === "true";
    })
    console.log(paymentMethod)

    useEffect(() => {
        setPaymentMethod("card")
    }, []);

    const token = localStorage.getItem("token");
    const user = useUser(token)

    const socket = io("http://localhost:8080");

    useEffect(() => {
        if (user !== undefined) {
            const userParse = JSON.parse(user)
            setLoginNowUserData(JSON.parse(userParse));
        }
    }, [user, sellingOrSoldOutStatus]);

    useEffect(() => {
        if (sellingOrSoldOut == "取引中" || sellingOrSoldOut == "売り切れ") {
            console.log("売り切れです。")
            setSellingOrSoldOutStatus("売り切れ")
        } else {
            console.log("販売中です")
            setSellingOrSoldOutStatus("")
        }
    }, [sellingOrSoldOut, sellingOrSoldOutStatus]);

    const handlePayment = async (method: string) => {
        try {
            if (loginNowUserData?._id == undefined || loginNowUserData == null || loginNowUserData == undefined) {
                console.log("ログインしてください。")
                window.alert("ログインしてから購入ボタンを押してください。")
                router.push("/login")
                return;
            }
            if (method === "payPay") {
                const response = await stripePaymentPayPay(productId, method, loginNowUserData?._id);
                console.log(response);
                if (response?.url) {
                    window.location.href = response.url;
                    console.log(response.url)
                    router.push("localhost:3000/")
                } else {
                    console.error("Invalid payment URLs");
                }
            } else if (method === "card") {
                if (!isButtonDisabled) {
                    socket.emit("clickButtonEvent");
                }
                const response = await stripePaymentFunc(productId, method, loginNowUserData?._id);
                console.log(response);
                if (response?.checkout_url) {
                    window.open(response.checkout_url, "_blank");
                } else {
                    console.error("Invalid payment URLs");
                }
            }
        } catch (err) {
            console.log(err)
            return null
        }
    }

    socket.on("update", (isButtonDisabled) => {
        setIsButtonDisabled(isButtonDisabled)
        localStorage.setItem("isButtonDisabled", isButtonDisabled)
        console.log(isButtonDisabled)
    })

    return (
        <>
            {sellingOrSoldOutStatus == "" ?
                (
                    <div className={"jus"} style={{display: "flex"}}>
                        <div className={"StripePurchaseButtonMain"}>
                            <button onClick={StripeUrl} className={"StripePurchaseButton"} type={"submit"}
                                    role={"link"}>
                                {!isButtonDisabled ? <p>購入</p> : <p>取引中</p>}
                            </button>
                        </div>
                        <div className={"selectProduct"}>
                            <img src="/img.png" alt="card" onClick={() => handlePayment("card")}/>
                            <img src="/paypay.png" alt="payPay" onClick={() => handlePayment("payPay")}/>
                        </div>
                    </div>
                )
                : <p>売り切れ</p>}
        </>
    );
};

export default CompleteStripe;
