"use client"
import React, {useState} from 'react';
import Header from "@/app/_components/header/Header";
import "./listingScreen.css"
import Image from "next/image"
import ListingScreenRadiobutton from "@/app/_components/listingScreenRadiobutton/ListingScreenRadiobutton";
import Link from 'next/link';
import createProduct from "@/app/utils/product/createProduct";　
import {ProductType} from "@/app/utils/product/productDetail";
import io from "socket.io-client";
import testvideoSave from "@/app/utils/product/testvideoSave";
import videoSave from "@/app/_components/video/videoSave";
import VideoSave from "@/app/_components/video/videoSave";　　

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
    const [productId, setProductId] = useState<ProductType | null>(null)
    const [productImage, setProductImage] = useState<string | null>(null)
    const [productVideoFiles, setProductVideoFiles] = useState<string | null>(null)
    const [compressedVideo, setCompressedVideo] = useState(null)

    console.log(JSON.stringify(productId))
    const shippingArea = shippingAreaText
    console.log(shippingArea)

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


    // const productCategory = productCategory
    // const productSize = productSize
    // const productCondition = productCondition
    // const postageBurden = postageBurden
    // const deliveryTime = deliveryTime
    // const shippingArea = shippingArea
    const socket = io("http://localhost:8080");

    // const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files
    //     if (files && files.length > 0) {
    //         setProductVideoFiles(files[0])
    //     }
    // }

    // const handleSubmit = async (e : React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('video', productVideoFiles);　
    //     formData.append('name', productVideoFiles?.name);　
    //     await  testvideoSave(formData)
    // };


    // console.log(socket)
    return (
        <>
            <Header/>
            <div>
                <VideoSave />
            </div>
            <div className={"content"}>
                <div className={"listingScreenBackground"}>
                    <form action={async (data: FormData) => {
                        console.log("asfasdfdafffdfdfdfffffffdddfffff")
                        const productName = data.get("productName") as string;
                        const productPrice = parseFloat(data.get("productPrice") as string);
                        const productDesc = data.get("productDesc") as string;
                        const productVideo = new FormData();
                        productVideo.append('video', productVideoFiles);
                        console.log(productName);
                        // Formdateでは基本文字列を入力するためstring型である。そこでparseFloatを用いることでstring型をnumber型でア渡してあげることで円滑に型変更できる
                        // 尚最初からnumber型で指定するとエラーが出てしまう。
                        const shippingArea = data.get("shippingArea") as string;
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
                        ).then(
                            (product => {
                                if (product?.result !== undefined) {
                                    const productParse = JSON.parse(product?.result as string)
                                    setProductId(productParse)
                                }
                            })
                        )
                        ;
                    }}>
                        <h2>
                            出品情報
                        </h2>

                        <div id="kamera">
                            {productImage &&
                                <Image src={productImage} width={377} height={377} alt={"選択した商品画像"}/>}
                            {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}
                            <input type="file" onChange={productImageFile}/>
                        </div>

                        <div id="kamera">
                            {productImage &&
                                <video src={productVideoFiles} width={377} height={377} alt={"選択した商品画像"}/>}
                            {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}
                            <input type="file" accept={"video/*"}
                                   onChange={(e) => setProductVideoFiles(e?.target?.files[0])}/>
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

                        <input type="text" name={"productDesc"} className="txtInput"/>


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
                                {productId ?
                                    <Link href={`/listingcomplete/${productId?._id}`}>
                                        <p>確認ページ</p>
                                    </Link>
                                    : <p>出品</p>}
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}


export default ListingScreen;
