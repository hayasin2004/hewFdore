"use client"
import React, {useState} from 'react';
import Header from "@/app/_components/header/Header";
import "./listingScreen.css"
import Image from "next/image"
import ListingScreenRadiobutton from "@/app/_components/listingScreenRadiobutton/ListingScreenRadiobutton";
import Link from 'next/link';
import createProduct from "@/app/utils/product/createProduct";
import {string} from "prop-types";

export interface productStatusType {
    productCategory?: string[],
    productCondition?: string,
    postageBurden?: string,
    shippingArea?: string,
    deliveryTime?: string,
    onCategoryChange?: string,
    onProductSizeChange?: string,
    onProductConditionChange?: string,
    onPostageBurdenChange?: string,
    onDeliveryTimeChange?: string,
    onShippingSource?: string,
}

const ListingScreen: React.FC = () => {
    const [productCategory, setProductCategory] = useState([])
    const [productSize, setProductSize] = useState<string | null>("")
    const [productCondition, setProductCondition] = useState<string | null>(null)
    const [postageBurden, setPostageBurden] = useState<string | null>(null)
    const [shippingAreaText, setShippingAreaText] = useState<string | null>(null)
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null)
    console.log(shippingAreaText)
    const shippingArea = shippingAreaText
    console.log(shippingArea)
    //
    // const productCategory = productCategory
    // const productSize = productSize
    // const productCondition = productCondition
    // const postageBurden = postageBurden
    // const deliveryTime = deliveryTime
    // const shippingArea = shippingArea


    return (
        <>
            <Header/>
            <div className={"content"}>
                <div className={"listingScreenBackground"}>
                    <form action={async (data: FormData) => {
                        console.log("asfasdfdafffdfdfdfffffffdddfffff")
                        const productName = data.get("productName") as string;
                        const productPrice = parseFloat(data.get("productPrice") as string);
                        const productDesc = data.get("productDesc") as string;

                        console.log(productName);
                        // Formdateでは基本文字列を入力するためstring型である。そこでparseFloatを用いることでstring型をnumber型でア渡してあげることで円滑に型変更できる
                        // 尚最初からnumber型で指定するとエラーが出てしまう。
                        const shippingArea = data.get("shippingArea") as string;
                        const token = localStorage.getItem("token") as string;
                        console.log("来てる"+shippingAreaText)
                        await createProduct(
                            token,
                            productName,
                            productDesc,
                            productPrice,
                            productCategory,
                            deliveryTime,
                            productSize,
                            productCondition,
                            postageBurden,
                            shippingAreaText
                        ).then();
                    }}>
                        <h2>
                            出品情報
                        </h2>

                        <div id="kamera">
                            <Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>
                        </div>


                        <h3 id="s_name">
                            商品名
                        </h3>


                        <input type="text" name={"productName"} className="txtInput"/>

                        <h3 className="kakaku">
                            価格
                        </h3>


                        <input type="text" name={"productPrice"} className="txtInput" placeholder={"¥"}/>

                        <h3 id="s_name">
                            商品詳細
                        </h3>

                        <input type="text" name={"productDesc"}  className="txtInput"/>


                        <h3 className="cat">
                            カテゴリ
                        </h3>
                        <ListingScreenRadiobutton
                            onCategoryChange={setProductCategory}
                            onProductSizeChange={setProductSize}
                            onProductConditionChange={setProductCondition}
                            onPostageBurdenChange={setPostageBurden}
                            onDeliveryTimeChange={setDeliveryTime}
                            onShippingSource={setShippingAreaText}

                        />


                        <div className={"ListingBtn"}>
                            <button className={"listingCancelbtn"}>
                                <Link href={"toppage"}>

                                    <p>キャンセル</p>
                                </Link>
                            </button>

                            <button className={"listingcompletebtn"} type={"submit"}>
                                {/*<Link href={"listingcomplete"}>*/}
                                <p>出品</p>
                                {/*</Link>*/}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}


export default ListingScreen;
