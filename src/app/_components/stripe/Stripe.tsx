"use client"
import React, {useEffect} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import * as stripe from "stripe";
import {stripePayment} from "@/app/utils/stripe/stripe";
import {string} from "prop-types";
import {useRouter} from "next/navigation";

const Stripe = ({productId}: { productId: string }) => {
        const router = useRouter();
    useEffect(() => {

    }, []);
        const StripeUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            const response = await stripePayment(productId);
            router.push(response?.checkout_url);


        }

    const handlePayPayPayment = async () => {
        const res = await fetch("/api/paypay", {
            method: "POST",
            headers : {
                "content-type": "application/json",
            },
            body : JSON.stringify({
                productId : productId
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

                <button onClick={handlePayPayPayment}>
                    支払う
                </button>
            </div>

        );
    }
;
export default Stripe;

