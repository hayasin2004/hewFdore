"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {stripePaymentFunc} from '@/app/utils/stripe/stripePaymentFunc';
import {stripePaymentPayPay} from "@/app/utils/stripe/paypaystripe";
import useUser from "@/hooks/useUser";
import io from "socket.io-client";
import "./stripe.css"
import Image from "next/image"
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {UserType} from "@/app/api/user/catchUser/route";

export interface CompleteStripeType {
    productId?: string;
    sellingOrSoldOut?: string;
}

const CompleteStripe = ({productId, sellingOrSoldOut}: CompleteStripeType) => {
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [loginNowUserData, setLoginNowUserData] = useState<UserType | undefined>(undefined)
    const [sellingOrSoldOutStatus, setSellingOrSoldOutStatus] = useState<string>("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
                            <Button className={"StripePurchaseButton"} onClick={handleOpen}>購入</Button>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    お支払い方法の選択
                                </Typography>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>

                                    <Image src="/img.png" alt="card " width={100} height={100}
                                           onClick={() => handlePayment("card")}/>
                                    <Image src="/paypay.png" alt="payPay" width={100} height={100}
                                           onClick={() => handlePayment("payPay")}/>
                                </Typography>
                            </Box>
                        </Modal>
                        <div className={"selectProduct"}>
                        </div>
                    </div>
                )
                : <p>売り切れ</p>}
        </>
    );
};

export default CompleteStripe;
