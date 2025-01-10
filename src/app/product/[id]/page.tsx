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
import UpdateProductCategoryLikeList from "@/app/utils/setting/update/InsertProductSellStatus";
import updateProductCategoryLikeList from "@/app/utils/setting/update/InsertProductSellStatus";
import inserteProductSellStatus from "@/app/utils/setting/update/InsertProductSellStatus";
import {useRouter} from "next/navigation";
import sellerCheck from "@/app/utils/product/sellerCheck";
import InsertProductSellStatus from "@/app/utils/user/InserteUserPurchase";
import insert from "@/app/utils/user/insert";

const Product = ({params}: { params: { id: string } }) => {
    const {user} = useUser()
    const router = useRouter()
    const currentUser = user?.userId
    console.log(currentUser)
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
    console.log(JSON.stringify(product))
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
            const result = await productLikeDate(id, currentUser)
        }
        productLikeData()
    }

    useEffect(() => {

        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get('session_id');
        const productId = query.get('productId');

        if (sessionId === "cancel") {
            localStorage.removeItem("isButtonDisabled");
            router.push(`/product/${productId}`)
        }
        const response = async () => {
            const productCatch = await productDetail(id)
            if (currentUser !== undefined || currentUser !== null) {
                const sellerCheckCatch = await sellerCheck(id, currentUser)
                setSameSellerStatus(sellerCheckCatch)
                console.log(sellerCheckCatch)
            }
            if (productCatch?.product !== undefined) {
                const productParse = JSON.parse(productCatch?.product)
                // console.log( await  productParse?.productLike == currentUser)
                setProduct(productParse)
            }
        }

        response()
    }, [user]);

    const insertColumn = async  () => {
        await insert()
    }


    useEffect(() => {
        if (product?.productLike?.includes(currentUser)) {
            console.log(product?.productLike.includes(currentUser));
            setProductLike(true);
        }
    }, [product]);
    return (
        <>
            <Header/>
            <button onClick={insertColumn}>ここおして</button>

            {/*<div className={"productMain"}>*/}

            {/*    <div id="cart">*/}
            <main className={"productMainDisplay"}>
                <div className={"productFlex"}>
                    <Sidebar/>

                    <div className="productMain">
                        <div id="info">
                            <div id="photo">
                                <figure>
                                    <Image src="/images/clothes/product9.jpg" width={200} height={200}
                                           alt="商品の写真"/>
                                </figure>
                                <ul className="piclist">
                                    <li className="picts"><a href="/images/clothes/product9.jpg">
                                        <figure>
                                            <Image src="/images/clothes/product9.jpg" width={50} height={50}
                                                   alt="商品の写真"/>
                                        </figure>
                                    </a>
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
                            </div>
                        </div>
                        <div>
                            <Chat paramsProductData={id}/>
                        </div>
                        <div id="controlProduct">
                            <ThemeProvider theme={theme}>
                                <Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => likeButton(e)}
                                          size={"large"} checked={productLike} {...label}
                                          icon={<FavoriteBorder/>}
                                          checkedIcon={<Favorite/>}/>
                            </ThemeProvider>
                            <p>いいね</p>
                            <Image width={30} height={30} src="/images/Cart_icon.png" alt="カート"/> <br/>


                            {/*<button id={"buy"}*/}
                            {/*        type="button" className={"productPurchase"}>*/}
                            {sameSellerStatus ? <Link href={`/listingScreenEdit/${productId}`}>編集する</Link> :
                                <Stripe productId={product?._id}/>}


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
