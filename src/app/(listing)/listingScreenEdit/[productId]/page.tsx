"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import "./listingScreen.css"
import Image from "next/image"
import ListingScreenRadiobutton from "@/app/_components/listingScreenRadiobutton/ListingScreenRadiobutton";
import Link from 'next/link';
import productDetail, {ProductType} from "@/app/utils/product/productDetail";
import io from "socket.io-client";
import editProduct from "@/app/utils/product/editProduct";
import deleteProduct from "@/app/utils/product/deleteProduct";
import sellerCheck from "@/app/utils/product/sellerCheck";
import {useRouter} from "next/navigation";

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

const ListingScreen = ({params}: { params: { productId: string | null } }) => {
    const [productCategory, setProductCategory] = useState([])
    const [productSize, setProductSize] = useState<string | null>("")
    const [productCondition, setProductCondition] = useState<string | null>(null)
    const [postageBurden, setPostageBurden] = useState<string | null>(null)
    const [shippingAreaText, setShippingAreaText] = useState<string | null>(null)
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null)
    const [productId, setProductId] = useState<ProductType | null>(null)
    const [product, setProduct] = useState<ProductType | null>(null)
    console.log(product)
    const [images, setImages] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string>("");
    console.log(JSON.stringify(productId))
    const shippingArea = shippingAreaText
    console.log(shippingArea)
    const router = useRouter()

    const EditProduct = params.productId
    console.log(EditProduct);
    // const productCategory = productCategory
    // const productSize = productSize
    // const productCondition = productCondition
    // const postageBurden = postageBurden
    // const deliveryTime = deliveryTime
    // const shippingArea = shippingArea
    const socket = io("http://localhost:8080");

    useEffect(() => {
        const productResult = async () => {
            const productCatch = await productDetail(productId)
            if (productCatch == null) {
                console.log("商品が消された可能性があります。")
                window.alert("商品が消された可能性があるので商品の詳細を表示することができませんでした。トップページに戻ります。");
                router.push("/")
            }
            const productCatchParse = JSON.parse(JSON.stringify(productCatch))
            if (productCatchParse?.product !== undefined) {
                const instanceProductParse = JSON.parse(productCatchParse.product)
                console.log("instanceProductParse" + instanceProductParse)
                setProduct(instanceProductParse)

                setMainImage(instanceProductParse?.productImage);  // メイン画像を初期化
                setImages([
                    instanceProductParse?.productImage,
                    instanceProductParse?.productImage2 || "",
                    instanceProductParse?.productImage3 || "",
                    instanceProductParse?.productImage4 || ""
                ]);
            }
        }
        productResult()
    }, []);

    const deleteProductFunc = async () => {
        const response = await deleteProduct(EditProduct)
        console.log(response)
    }

    console.log(socket)
    return (
        <>
            <Header/>
            {productId}
            {productId}
            <div className={"content"}>
                <div className={"listingScreenBackground"}>
                    <form action={async (data: FormData) => {
                        const productName = data.get("productName") as string;
                        const productPrice = parseFloat(data.get("productPrice") as string);
                        const productDesc = data.get("productDesc") as string;

                        console.log(productName);
                        // Formdateでは基本文字列を入力するためstring型である。そこでparseFloatを用いることでstring型をnumber型でア渡してあげることで円滑に型変更できる
                        // // 尚最初からnumber型で指定するとエラーが出てしまう。
                        // const shippingArea = data.get("shippingArea") as string;
                        // const token = localStorage.getItem("token") as string;
                        console.log("来てる" + shippingAreaText)
                        await editProduct(
                            EditProduct,
                            productName,
                            productDesc,
                            productPrice,
                            productCategory,
                            deliveryTime,
                            productSize,
                            productCondition,
                            postageBurden,
                            shippingAreaText
                        ).then(
                            (product => {
                                if (product?.result !== undefined) {
                                    const productParse = JSON.parse(JSON.stringify(product?.result))
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
                            <Image src={mainImage ? mainImage : "/images/clothes/product.jpg"} width={377} height={377}
                                   alt={"商品がないとき"}/>
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
                                    : <p>編集</p>}
                            </button>
                            <button onClick={deleteProductFunc} className={"listingcompletebtn"} type={"submit"}>
                                <p>削除</p>
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}


export default ListingScreen;
