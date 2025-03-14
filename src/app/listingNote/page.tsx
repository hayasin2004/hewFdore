"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Image from "next/image";
import "./listingNote.css"
import Link from "next/link";
import useUser from "@/hooks/useUser";
import listingNote from "@/app/utils/product/listingNote";
import {ProductType} from "@/app/utils/product/productDetail";
import {UserType} from "@/app/api/user/catchUser/route";

const PaidNote = () => {
    const [productData, setProductData] = useState<ProductType[] | null>([])
    const [loginUserData, setLoginUserData] = useState<UserType | undefined>(undefined)

    const [token, setToken] = useState<string | null>(null)

    const user = useUser(token)
    useEffect(() => {

        if (typeof window !== "undefined") {
            // Your code that accesses localStorage
            const data = localStorage.getItem("token");
            setToken(data)
        }
    }, []);
    const userParse = JSON.parse(user)
    const currentUser = loginUserData?._id

    console.log(productData)
    useEffect(() => {
        setLoginUserData(JSON.parse(userParse))

        const fetchPurchaseProduct = async () => {
            if (currentUser !== undefined) {

                const response = await listingNote(currentUser)
                console.log(response)
                if (response !== null) {
                    setProductData(JSON.parse(response))
                }
                console.log(response)
            }
        }
        fetchPurchaseProduct()
    }, [user ,currentUser,userParse ,token]);


    return (
        <>
            <Header/>
            <span id={"btn"}>
                    <Link href={"toppage"}>
                <button>


                    戻る
                </button>
                    </Link>
            </span>
            <div className={"paidText"}>
                <h2 id={"PNtitle"}>
                    出品履歴
                </h2>
            </div>
            <div className={"listing"}>
                <div className={"listing_product"}>
                    {productData?.map((productItem :ProductType) => (
                        <div key={productItem?._id}>
                            <div className={"product"}>
                                <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                                <div className={"product_text"}>
                                    <p>
                                        商品名 : {productItem?.productName}
                                    </p>
                                    <p>出品者 : {productItem?.sellerId}</p>
                                    <p>価格 : {productItem?.productPrice}</p>

                                </div>
                                <div className={"listingText"}>
                                    <h3>評価</h3>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>

                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
        ;
}


export default PaidNote;