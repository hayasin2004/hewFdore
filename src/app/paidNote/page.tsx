"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Image from "next/image";
import "./paidNote.css"
import Link from "next/link";
import purchaseProduct from "@/app/utils/product/purchaseProduct";
import useUser from "@/hooks/useUser";
import {productCommentType} from "@/models/ProductComment";
import {UserType} from "@/app/api/user/catchUser/route";

const PaidNote = () => {
    const [purchaseData, setPurchaseData] = useState([])
    const [productData, setProductData] = useState([])
    const [loginUserData, setLoginUserData] = useState<UserType | null>(null)

    const user = useUser()
    console.log(loginUserData)
    useEffect(() => {

        const userParse = JSON.parse(user)
        console.log("userParse" + userParse)
        setLoginUserData(JSON.parse(userParse))
        if (userParse) {
            const fetchPurchaseProduct = async () => {
                const response = await purchaseProduct(loginUserData?._id)
                console.log(response)
                if (response?.purchaseProduct !== undefined) {
                    setPurchaseData(JSON.parse(response?.purchaseProduct))
                }
                if (response?.product !== undefined) {
                    setProductData(JSON.parse(response?.product))
                }
                console.log(response)
            }
            fetchPurchaseProduct()
        }
    }, [user]);

    useEffect(() => {
        console.log("いまきた")
    }, [loginUserData]);


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
                    購入履歴
                </h2>
            </div>
            <div className={"listing"}>
                <div className={"listing_product"}>
                    {purchaseData?.map((purchaseItem) => (

                        <ul key={purchaseItem?._id}>
                            <li>
                                <Link href={`/tradeChat/${purchaseItem?._id}`}>
                                    {purchaseItem?._id}
                                </Link>
                            </li>
                        </ul>
                    ))}

                    {productData?.map((productItem) => (
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