"use client"
import React, {useEffect} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import * as stripe from "stripe";
import {stripePayment} from "@/app/utils/stripe/stripe";
import {string} from "prop-types";
import {useRouter} from "next/navigation";

const Stripe= ({productId} : {productId : string}) => {
    const StripeUrl = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await stripePayment(productId);
}


return (
    <div>
        <form method="POST">
            <button onClick={StripeUrl} type={"submit"} role={"link"}>お支払い</button>
        </form>
    </div>
);
}
;

export default Stripe;