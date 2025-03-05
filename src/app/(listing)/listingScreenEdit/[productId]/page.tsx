"use client"
import React, {useEffect, useState} from "react";
import Header from "@/app/_components/header/Header";
import "./listingScreen.css";
import Image from "next/image";
import ListingScreenRadiobutton from "@/app/_components/listingScreenRadiobutton/ListingScreenRadiobutton";
import Link from "next/link";
import productDetail, {ProductType} from "@/app/utils/product/productDetail";
import io from "socket.io-client";
import editProduct from "@/app/utils/product/editProduct";
import deleteProduct from "@/app/utils/product/deleteProduct";
import {useRouter} from "next/navigation";

export interface productStatusType {
    productCategory?: string;
    productCondition?: string;
    postageBurden?: string;
    shippingArea?: string;
    deliveryTime?: string;
}

const ListingScreen = ({params}: { params: { productId: string | null } }) => {
    const [productCategory, setProductCategory] = useState<string | null>(null);
    const [productSize, setProductSize] = useState<string | null>(null);
    const [productCondition, setProductCondition] = useState<string | null>(null);
    const [postageBurden, setPostageBurden] = useState<string | null>(null);
    const [shippingAreaText, setShippingAreaText] = useState<string | null>(null);
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
    const [productId, setProductId] = useState<ProductType | null>(null);
    const [product, setProduct] = useState<ProductType | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string>("");
    const router = useRouter();
    console.log(product, images)
    const EditProduct = params.productId;


    useEffect(() => {
        const productResult = async () => {
            const productCatch = await productDetail(productId!);
            if (!productCatch) {
                console.log("商品が消された可能性があります。");
                window.alert(
                    "商品が消された可能性があるので商品の詳細を表示することができませんでした。トップページに戻ります。"
                );
                router.push("/");
                return;
            }
            const instanceProductParse = JSON.parse(productCatch.product);
            setProduct(instanceProductParse);
            setMainImage(instanceProductParse?.productImage);
            setImages([
                instanceProductParse?.productImage,
                instanceProductParse?.productImage2 || "",
                instanceProductParse?.productImage3 || "",
                instanceProductParse?.productImage4 || "",
            ]);
        };
        productResult();
    }, [productId]);

    const deleteProductFunc = async () => {
        try {
            const response = await deleteProduct(EditProduct);
            console.log(response);
            if (response){
                window.alert("削除完了しました。")
                router.push("/");
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <Header/>
            <div className={"content"}>
                <div className={"listingScreenBackground"}>
                    <form
                        action={async (data: FormData) => {
                            const productName = data.get("productName") as string;
                            const productPrice = parseFloat(data.get("productPrice") as string);
                            const productDesc = data.get("productDesc") as string;

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
                            ).then((product) => {
                                if (product?.result !== undefined) {
                                    setProductId(product.result);
                                }
                            });
                        }}
                    >
                        <h2>出品情報</h2>

                        <div id="kamera">
                            <Image
                                src={mainImage ? mainImage : "/images/clothes/product.jpg"}
                                width={377}
                                height={377}
                                alt={"商品がないとき"}
                            />
                        </div>

                        <h3 id="s_name">商品名</h3>
                        <input type="text" name={"productName"} className="txtInput"/>

                        <h3 className="kakaku">価格</h3>
                        <input type="text" name={"productPrice"} className="txtInput" placeholder={"¥"}/>

                        <h3 id="s_name">商品詳細</h3>
                        <input type="text" name={"productDesc"} className="txtInput"/>

                        <h3 className="cat">カテゴリ</h3>
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
                                {productId ? (
                                    <Link href={`/listingcomplete/${productId?._id}`}>
                                        <p>確認ページ</p>
                                    </Link>
                                ) : (
                                    <p>編集</p>
                                )}
                            </button>
                            <button onClick={deleteProductFunc} className={"listingcompletebtn"} type={"button"}>
                                <p>削除</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ListingScreen;
