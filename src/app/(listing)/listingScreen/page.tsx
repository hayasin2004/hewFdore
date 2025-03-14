"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import "./listingScreen.css"
import Image from "next/image"
import ListingScreenRadiobutton from "@/app/_components/listingScreenRadiobutton/ListingScreenRadiobutton";
import Link from 'next/link';
import createProduct from "@/app/utils/product/createProduct";
import {ProductType} from "@/app/utils/product/productDetail";
import io from "socket.io-client";
import Footer from "@/app/_components/footer/Footer";
import {useRouter} from "next/navigation";

export interface productStatusType {
    productCategory?: string[],
    productCondition?: string | null, // 修正
    postageBurden?: string | null, // 修正
    shippingArea?: string | null, // 修正
    deliveryTime?: string | null, // 修正
    onCategoryChange?: (categories: string) => void,
    onProductSizeChange?: (size: string | null) => void, // 修正
    onProductConditionChange?: (condition: string | null) => void, // 修正
    onPostageBurdenChange?: (burden: string | null) => void, // 修正
    onDeliveryTimeChange?: (time: string | null) => void, // 修正
    onShippingSource?: (source: string | null) => void // 修正
}

const ListingScreen: React.FC = () => {
    const [productCategory, setProductCategory] = useState<string | null>(null)
    const [productSize, setProductSize] = useState<string | null>("");
    const [productCondition, setProductCondition] = useState<string | null>(null);
    const [postageBurden, setPostageBurden] = useState<string | null>(null);
    const [shippingAreaText, setShippingAreaText] = useState<string | null>(null);
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
    const [productId, setProductId] = useState<ProductType | null>(null);
    const [productImage, setProductImage] = useState<string | null>(null);
    const [productImage2, setProductImage2] = useState<string | null>(null);
    const [productImage3, setProductImage3] = useState<string | null>(null);
    const [productImage4, setProductImage4] = useState<string | null>(null);
    
    const router = useRouter()
    console.log(JSON.stringify(productId))
    const shippingArea = shippingAreaText
    console.log(shippingArea,)

    const productImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const render = new FileReader()
            render.onloadend = () => {
                setProductImage(render.result as string)
            }
            render.readAsDataURL(file)
        }
    };
    const productImageFile2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const render = new FileReader()
            render.onloadend = () => {
                setProductImage2(render.result as string)
            }
            render.readAsDataURL(file)
        }
    };
    const productImageFile3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const render = new FileReader()
            render.onloadend = () => {
                setProductImage3(render.result as string)
            }
            render.readAsDataURL(file)
        }
    };
    const productImageFile4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const render = new FileReader()
            render.onloadend = () => {
                setProductImage4(render.result as string)
            }
            render.readAsDataURL(file)
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            (async () => {
                window.alert("ログインしていないので出品できません。ログインページに移ります")
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push("/login")
            })()
        }
    }, []);
    // const shippingArea = shippingArea
    const socket = io("http://localhost:8080");
    console.log(socket)


    return (
        <>
            <Header/>
            <div id={"bgsell"}>

                <div className={"content"}>
                    <form action={async (data: FormData) => {
                        console.log("asfasdfdafffdfdfdfffffffdddfffff")
                        const productName = data.get("productName") as string;
                        const productPrice = parseFloat(data.get("productPrice") as string);
                        const productDesc = data.get("productDesc") as string;
                        // const productVideo = data.get("productVideo");
                        console.log(productName);
                        // Formdateでは基本文字列を入力するためstring型である。そこでparseFloatを用いることでstring型をnumber型でア渡してあげることで円滑に型変更できる
                        // 尚最初からnumber型で指定するとエラーが出てしまう。
                        const token = localStorage.getItem("token") as string;
                        console.log("来てる" + shippingAreaText)
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
                            shippingAreaText,
                            productImage,
                            data,
                            productImage2,
                            productImage3,
                            productImage4,
                        ).then(
                            (product => {
                                if (product?.result == null) {
                                    window.alert("ログインしてから出品してください。")
                                }
                                if (product?.result !== undefined) {
                                    const productParse = JSON.parse(product?.result as string)
                                    setProductId(productParse)
                                    window.location.href = "/searchResult"
                                }
                            })
                        )
                        ;
                    }}>
                        <h2 id={"LStitle"}>
                            出品情報
                        </h2>
                        <div>
                            <h3 className={"formTitle"} id="product_name">
                                写真
                            </h3>
                            <div id={"Photos"}>
                                <div className={"kamera"}>
                                    {productImage &&
                                        <Image className={"photo_preview"} src={productImage} width={250} height={250}
                                               alt={"選択した商品画像"}/>}
                                    {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}
                                    <label htmlFor="clothes1">
                                        {productImage ?
                                            <svg className={"initCameraIcon_none"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                            </svg>
                                            :
                                            <svg className={"initCameraIcon"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                      d="M19 6.5h-1.28l-.32-1a3 3 0 0 0-2.84-2H9.44A3 3 0 0 0 6.6 5.55l-.32 1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3.05Zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1Zm-8-9a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"/>
                                            </svg>
                                        }
                                    </label>
                                    <input type="file" id={"clothes1"} style={{display: "none"}}
                                           onChange={productImageFile}/>

                                </div>
                                <div className={"kamera"}>
                                    {productImage2 &&
                                        <Image className={"photo_preview"} src={productImage2} width={250} height={250}
                                               alt={"選択した商品画像"}/>}
                                    {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}
                                    <label htmlFor="clothes2">

                                        {productImage2 ?
                                            <svg className={"initCameraIcon_none"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                            </svg>
                                            :
                                            <svg className={"initCameraIcon"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                      d="M19 6.5h-1.28l-.32-1a3 3 0 0 0-2.84-2H9.44A3 3 0 0 0 6.6 5.55l-.32 1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3.05Zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1Zm-8-9a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"/>
                                            </svg>
                                        }
                                    </label>

                                    <input type="file" id={"clothes2"} style={{display: "none"}}
                                           onChange={productImageFile2}/>
                                </div>
                                <div className={"kamera"}>
                                    {productImage3 &&
                                        <Image className={"photo_preview"} src={productImage3} width={250} height={250}
                                               alt={"選択した商品画像"}/>}
                                    {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}
                                    <label htmlFor="clothes3">
                                        {productImage3 ?
                                            <svg className={"initCameraIcon_none"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                            </svg>
                                            :
                                            <svg className={"initCameraIcon"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                      d="M19 6.5h-1.28l-.32-1a3 3 0 0 0-2.84-2H9.44A3 3 0 0 0 6.6 5.55l-.32 1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3.05Zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1Zm-8-9a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"/>
                                            </svg>
                                        }
                                    </label>
                                    <input type="file" id={"clothes3"} style={{display: "none"}}
                                           onChange={productImageFile3}/>
                                </div>
                                <div className={"kamera"}>
                                    {productImage4 &&
                                        <Image className={"photo_preview"} src={productImage4} width={250} height={250}
                                               alt={"選択した商品画像"}/>}
                                    {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}
                                    <label htmlFor="clothes4">
                                        {productImage4 ?
                                            <svg className={"initCameraIcon_none"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                            </svg>
                                            :
                                            <svg className={"initCameraIcon"} xmlns="http://www.w3.org/2000/svg"
                                                 width="180" height="180"
                                                 viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                      d="M19 6.5h-1.28l-.32-1a3 3 0 0 0-2.84-2H9.44A3 3 0 0 0 6.6 5.55l-.32 1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3.05Zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1Zm-8-9a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"/>
                                            </svg>
                                        }
                                    </label>
                                    <input type="file" id={"clothes4"} style={{display: "none"}}
                                           onChange={productImageFile4}/>
                                </div>
                            </div>

                        </div>
                        {/*<div id="kamera">*/}
                        {/*    {productImage &&*/}
                        {/*        <video src={productVideoFiles} width={377} height={377} alt={"選択した商品画像"}/>}*/}
                        {/*    /!*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*!/*/}
                        {/*    <input type="file" accept={"video/*"}*/}
                        {/*           onChange={(e) => setProductVideoFiles(e?.target?.files[0])}/>*/}
                        {/*</div>*/}


                        {/*<div className={"kamera"}>*/}
                        {/*    {videoUrl &&*/}
                        {/*        <video src={videoUrl} width={250} height={250} aria-label={"選択した商品画像"}/>}*/}
                        {/*    /!*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*!/*/}
                        {/*    <label htmlFor="video">*/}
                        {/*        /!*ここマージの時注意　名称はこっちでない方を優先してください*!/*/}
                        {/*        {videoUrl ?*/}
                        {/*            <svg className={"initCameraIcon_none"} xmlns="http://www.w3.org/2000/svg"*/}
                        {/*                 width="150"*/}
                        {/*                 height="150" viewBox="0 0 24 24">*/}
                        {/*                <path fill="currentColor"*/}
                        {/*                      d="M21.53 7.15a1 1 0 0 0-1 0L17 8.89A3 3 0 0 0 14 6H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h9a3 3 0 0 0 3-2.89l3.56 1.78A1 1 0 0 0 21 17a1 1 0 0 0 .53-.15A1 1 0 0 0 22 16V8a1 1 0 0 0-.47-.85ZM15 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1Zm5-.62l-3-1.5v-1.76l3-1.5Z"/>*/}
                        {/*            </svg> :*/}
                        {/*            <svg style={{pointerEvents: "auto"}} className={"initCameraIcon"}*/}
                        {/*                 xmlns="http://www.w3.org/2000/svg" width="150"*/}
                        {/*                 height="150" viewBox="0 0 24 24">*/}
                        {/*                <path fill="currentColor"*/}
                        {/*                      d="M21.53 7.15a1 1 0 0 0-1 0L17 8.89A3 3 0 0 0 14 6H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h9a3 3 0 0 0 3-2.89l3.56 1.78A1 1 0 0 0 21 17a1 1 0 0 0 .53-.15A1 1 0 0 0 22 16V8a1 1 0 0 0-.47-.85ZM15 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1Zm5-.62l-3-1.5v-1.76l3-1.5Z"/>*/}
                        {/*            </svg>}*/}

                        {/*    </label>*/}
                        {/*    <input*/}
                        {/*        type="file"*/}
                        {/*        accept="video/*"*/}
                        {/*        style={{display: "none"}}*/}
                        {/*        id={"video"}*/}
                        {/*        name={"productVideo"}*/}
                        {/*        onChange={productVideoFile}*/}
                        {/*    />*/}
                        {/*</div>*/}


                        <h3 className={"formTitle"} id="product_name">
                            商品名
                        </h3>


                        <input type="text" name={"productName"} className="txtInput"/>

                        <h3 className={"formTitle"} id="kakaku">
                            価格
                        </h3>


                        <input type="text" name={"productPrice"} className="txtInput" placeholder={"¥"}/>

                        <h3 className={"formTitle"} id="explain">
                            商品詳細
                        </h3>

                        <textarea name={"productDesc"} className="areaInput" maxLength={800} rows={4}/>


                        <h3 className="formTitle" id={"cat"}>
                            カテゴリ
                        </h3>
                        {/*視認性が悪いのでここも色変えたい*/}
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
                                <p>出品</p>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer/>

        </>
    );
}


export default ListingScreen;
