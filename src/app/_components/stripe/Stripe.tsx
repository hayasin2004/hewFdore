"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {stripePaymentFunc} from '@/app/utils/stripe/stripePaymentFunc';
import {stripePaymentPayPay} from "@/app/utils/stripe/paypaystripe";
import useUser from "@/hooks/useUser";
import {UserType} from "@/app/api/user/catchUser/route";
import io from "socket.io-client";
import "./stripe.css"
import {display} from "@mui/system";

const CompleteStripe = ({productId}: { productId: string }) => {
        const router = useRouter();

        const [paymentMethod, setPaymentMethod] = useState<string>('card');
        const [loginNowUserData, setLoginNowUserData] = useState(null)
        console.log(loginNowUserData?._id)
        const [isButtonDisabled, setIsButtonDisabled] = useState(() => {
            const status = localStorage.getItem("isButtonDisabled")
            return status === "true";
        })
        console.log(paymentMethod)
        const user = useUser()

        const socket = io("http://localhost:8080");
        //
        // useEffect(() => {
        //     const browserBack = (event: PopStateEvent) => {
        //         event.preventDefault();
        //         event.stopPropagation();
        //         alert("ストライプの戻るボタンから戻ってください")
        //     }
        //     window.addEventListener("popstate", browserBack);
        //     return () => {
        //         window.removeEventListener("popstate", browserBack)
        //     }
        // }, []);


        useEffect(() => {
            const userParse = JSON.parse(user)
            setLoginNowUserData(JSON.parse(userParse));
        }, [user]);
        const StripeUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
            try {
                e.preventDefault()
                if (paymentMethod === "payPay") {
                    const response = await stripePaymentPayPay(productId, paymentMethod, loginNowUserData?._id);
                    console.log(response);
                    if (response?.url) {
                        window.location.href = response.url;
                        console.log(response.url)
                        router.push("localhost:3000/")
                    } else {
                        console.error("Invalid payment URLs");
                    }
                } else if (paymentMethod === "card") {

                    if (!isButtonDisabled) {
                        socket.emit("clickButtonEvent");
                    }
                    const response = await stripePaymentFunc(productId, paymentMethod, loginNowUserData?._id);

                    console.log(response);
                    if (response?.checkout_url) {
                        window.open(response.checkout_url, "_blank");
                    } else {
                        console.error("Invalid payment URLs");
                    }
                }

            } catch (err) {
            }
        }


        const handlePayPayPayment = async () => {
            const res = await fetch("/api/paypay", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId
                })
            })
            const json = await res.json()
            window.location.href = json.url
        }


        socket.on("update", (isButtonDisabled) => {
            setIsButtonDisabled(isButtonDisabled)
            localStorage.setItem("isButtonDisabled", isButtonDisabled)
            console.log(isButtonDisabled)
        })


        return (
            <>
                <div style={{display: "flex"}}>

                    <div className={"StripePurchaseButtonMain"}>

                        {/*<button onClick={StripeUrl} disabled={isButtonDisabled} type={"submit"} role={"link"}>*/}
                        <button onClick={StripeUrl} className={"StripePurchaseButton"} type={"submit"} role={"link"}>
                            {!isButtonDisabled ? <p>購入</p> : <p>取引中</p>}
                        </button>

                    </div>

                    <label style={{opacity: 10}}> 支払い方法を選択してください:
                        <select onChange={(e) => setPaymentMethod(e.target.value)}
                                value={paymentMethod}>
                            <option value="card">カード払い</option>
                            <option value="payPay">PayPay</option>
                        </select>
                    </label>

                    {/*<button onClick={handlePayPayPayment}>*/}
                    {/*    支払う*/}
                    {/*</button>*/}
                </div>
            </>

        );
    }
;
export default CompleteStripe;

