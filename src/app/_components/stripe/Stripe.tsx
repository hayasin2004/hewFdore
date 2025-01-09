"use client"
import React, {useEffect, useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import * as stripe from "stripe";
import {string} from "prop-types";
import {useRouter} from "next/navigation";
import {stripePaymentFunc} from '@/app/utils/stripe/stripePaymentFunc';
import {stripePaymentPayPay} from "@/app/utils/stripe/paypaystripe";
import useUser from "@/hooks/useUser";
import {UserType} from "@/app/api/user/catchUser/route";
import io from "socket.io-client";

const CompleteStripe = ({productId}: { productId: string }) => {
        const [paymentMethod, setPaymentMethod] = useState<string>('card');
        const [userId, setUserId] = useState(null)
        const [isButtonDisabled, setIsButtonDisabled] = useState(() =>{
            const status = localStorage.getItem("isButtonDisabled")
            return status === "true";
        })
        console.log(paymentMethod)
        const {user}: { user: string | null } = useUser()


        const socket = io("http://localhost:8080");


        useEffect(() => {
            setUserId(user?.userId);
        }, [user]);
        const StripeUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
            try {

                e.preventDefault()
                if (paymentMethod === "paypay") {
                    const response = await stripePaymentPayPay(productId, paymentMethod, userId);
                    console.log(response);
                    if (response?.url) {
                        window.location.href = response.url;
                        console.log(response.url)
                    } else {
                        console.error("Invalid payment URLs");
                    }
                } else if (paymentMethod === "card") {
                    const response = await stripePaymentFunc(productId, paymentMethod, userId);
                    console.log(response);
                    if (response?.checkout_url) {
                        window.location.href = response.checkout_url;
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

        const testClick = () => {
            if (!isButtonDisabled) {
                socket.emit("clickButtonEvent")
            }
        }

        socket.on("update", (isButtonDisabled) => {
            setIsButtonDisabled(isButtonDisabled)
            console.log(isButtonDisabled)
            localStorage.setItem("isButtonDisabled" , isButtonDisabled)
        })


        return (
            <div>
                <h1>
                    決済テスト
                </h1>
                <form method="POST">
                    <button onClick={StripeUrl} disabled={isButtonDisabled} type={"submit"} role={"link"}>
                        {!isButtonDisabled ? <p>購入</p> : <p>他の人が購入処理中</p>}
                    </button>
                </form>

                <label> 支払い方法を選択してください:
                    <select onChange={(e) => setPaymentMethod(e.target.value)}
                            value={paymentMethod}>
                        <option value="card">カード払い</option>
                        <option value="paypay">PayPay</option>
                    </select>
                </label>

                {/*<button onClick={handlePayPayPayment}>*/}
                {/*    支払う*/}
                {/*</button>*/}
                <button onClick={testClick} disabled={isButtonDisabled}>
                    {!isButtonDisabled ? <p>今触れるよ</p> : <p>他の人が購入処理中</p>}
                </button>
            </div>

        );
    }
;
export default CompleteStripe;

