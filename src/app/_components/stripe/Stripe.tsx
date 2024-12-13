"use client"
import React, {useEffect, useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import * as stripe from "stripe";
import {stripePayment} from "@/app/utils/stripe/stripe";
import {string} from "prop-types";
import {useRouter} from "next/navigation";
import {stripePaymentPayPay} from "@/app/utils/stripe/paypaystripe";

const CompleteStripe = ({productId}: { productId: string }) => {
        const [paymentMethod, setPaymentMethod] = useState<string>('card');
        console.log(paymentMethod)
        const router = useRouter();
        useEffect(() => {

        }, []);
        const StripeUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
            try {

                e.preventDefault()
                if (paymentMethod === "paypay") {
                    const response = await stripePaymentPayPay(productId, paymentMethod);
                    console.log(response);
                    if (response?.url) {
                        window.location.href = response.url;
                        console.log(response.url)
                    } else {
                        console.error("Invalid payment URLs");
                    }
                } else if (paymentMethod === "card") {
                    const response = await stripePayment(productId, paymentMethod);
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


        return (
            <div>
                <form method="POST">
                    <button onClick={StripeUrl} type={"submit"} role={"link"}>お支払い</button>
                </form>

                <h1>
                    PayPay 決済テスト
                </h1>
                <label> 支払い方法を選択してください:
                    <select onChange={(e) => setPaymentMethod(e.target.value)}
                            value={paymentMethod}>
                        <option value="card">カード払い</option>
                        <option value="paypay">PayPay</option>
                    </select> </label>

                <button onClick={handlePayPayPayment}>
                    支払う
                </button>
            </div>

        );
    }
;
export default CompleteStripe;

