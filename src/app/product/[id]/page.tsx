"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image"
import "./product.css"
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Link from 'next/link';
import Sidebar from "@/app/_components/sidebar/Sidebar";
import productDetail, {ProductType} from "@/app/utils/product/productDetail";
import Favorite from '@mui/icons-material/Favorite';
import {Checkbox} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import productLikeDate from "@/app/utils/product/productLikeDate";
import useUser from "@/hooks/useUser";
import Chat from "@/app/_components/chat/Chat";
import Stripe from "@/app/_components/stripe/Stripe";
import {useRouter} from "next/navigation";
import sellerCheck from "@/app/utils/product/sellerCheck";


const Product = ({params}: { params: { id: string } }) => {
    const [loginUserData, setLoginUserData] = useState<UserType | null>(null)

    const [productVideo, setProductVideo] = useState<string>()
    const user = useUser()
    const router = useRouter()
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF1493',
            },
            info: {
                main: '#FF1493',
            }
        },
    });
    const [product, setProduct] = useState<ProductType | null>(null)
    console.log(product)

    // const [productLikeUpdate, setProductLikeUpdate] = useState<ProductType | null>(null)
    const [sameSellerStatus, setSameSellerStatus] = useState<boolean>(false)
    console.log(status)
    const [productLike, setProductLike] = useState<boolean>(false)
    const id = params?.id
    const productId = product?._id
    const likeButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductLike(!productLike)
        console.log(productLike)
        const productLikeData = async () => {
            const result = await productLikeDate(id, loginUserData?._id)
            if (result == "mineProduct"){
                window.alert("自分の商品にはいいねできないです。")
            }
            if (result == "notLogin"){
                window.alert("ログインしていないといいねはできないです。")
                setProductLike(false)
            }
        }
        productLikeData()
    }

    useEffect(() => {
        if (user !== undefined) {
            const userParse = JSON.parse(user)
            setLoginUserData(JSON.parse(userParse));
        }

        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        const productId = query.get('productId');

        if (sessionId === "cancel") {
            localStorage.removeItem("isButtonDisabled");
            router.push(`/product/${productId}`)
        }
        const response = async () => {
            const productCatch = await productDetail(id)
            if (loginUserData?._id !== undefined || loginUserData?._id !== null) {
                const sellerCheckCatch = await sellerCheck(id, loginUserData?._id)
                setSameSellerStatus(sellerCheckCatch)
                console.log(sellerCheckCatch)
            }
            if (productCatch == null){
                console.log("商品が消された可能性があります。")
                window.alert("商品が消された可能性があるので商品の詳細を表示することができませんでした。トップページに戻ります。");
                router.push("/")
            }
            const productCatchParse = JSON.parse(JSON.stringify(productCatch))
            if (productCatchParse?.product !== undefined) {
                setProduct(JSON.parse(productCatchParse?.product))
            }
            if (productCatchParse?.video !== undefined && productCatchParse?.video !== null){
                const video = productCatchParse?.video
                // const blob = await video?.blob()
                // const url = URL.createObjectURL(blob)
                setProductVideo(video)
            }
        }

        response()
    }, [user]);


    useEffect(() => {
        if (product?.productLike?.includes(loginUserData?._id)) {
            console.log(product?.productLike.includes(loginUserData?._id));
            setProductLike(true);
        }
    }, [product]);

    return (
        <>
            <Header/>

            {/*<div className={"productMain"}>*/}

            {/*    <div id="cart">*/}
            <main className={"productMainDisplay"}>
                <div className={"productFlex"}>
                    <Sidebar/>

                    <div className="productMain">
                        <div id="info">
                            <div id="photo">
                                <figure>
                                    <Image src={product?.productImage} width={200} height={200}
                                           alt="商品の写真"/>
                                </figure>
                                <ul className="piclist">
                                    <li className="picts">
                                        <figure>
                                            <Image
                                                src={product?.productImage !== undefined ? product?.productImage : "/images/clothes/product.jpg"}
                                                width={50} height={50}
                                                alt="商品の写真"/>
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                            <div id="text">
                                <h1>ニット</h1>
                                <span className="under_bar"></span>
                                <Link href="/" id="seller">
                                    <h2>出品者:{product?.sellerUserName}
                                    </h2>

                                    <h2>{product?.username}</h2>
                                </Link>
                                <p>
                                    商品詳細<br/>
                                    {product?.productDesc}<br/>
                                </p>
                                <p>
                                    商品価格<br/>
                                    {product?.productPrice}円<br/>
                                </p>
                                <p id="size">サイズ:S</p>
                                <p id="used">商品状態:多少使用感がある</p>
                                <p id="postage">送料:出品者負担</p>
                                <p id="category">カテゴリ: ニット Sサイズ 春物 色</p>
                                <video src={productVideo !== undefined && productVideo !== null ? `/${productVideo}` : ""}
                                       loop autoPlay controls></video>
                            </div>
                        </div>
                        <div>
                            <Chat paramsProductData={id}/>
                        </div>
                        <div id="controlProduct">
                            {product?.sellStatus == "trading" ?
                                <></>
                                :
                                <ThemeProvider theme={theme}>
                                    <Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => likeButton(e)}
                                              size={"large"} checked={productLike} {...label}
                                              icon={<FavoriteBorder/>}
                                              checkedIcon={<Favorite/>}/>
                                </ThemeProvider>
                            }
                            <p>いいね</p>
                            <Image width={30} height={30} src="/images/Cart_icon.png" alt="カート"/> <br/>


                            {/*<button id={"buy"}*/}
                            {/*        type="button" className={"productPurchase"}>*/}
                            {sameSellerStatus ? <Link href={`/listingScreenEdit/${productId}`}>編集する</Link> :
                                <Stripe productId={product?._id} sellingOrSoldOut={product?.sellStatus == "trading" ? true : false}/>}


                            {/*</button>*/}
                        </div>


                    </div>
                </div>


            </main>
            <Footer/>
        </>
    );
}


export default Product;
