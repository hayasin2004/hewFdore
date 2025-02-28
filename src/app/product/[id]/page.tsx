"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image"
import "./product.css"
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Link from 'next/link';　
import productDetail, {ProductType} from "@/app/utils/product/productDetail";
import Favorite from '@mui/icons-material/Favorite';
import {Checkbox} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import productLikeDate from "@/app/utils/product/productLikeDate";
import useUser from "@/hooks/useUser";
import Chat from "@/app/_components/chat/Chat";
import Stripe from "@/app/_components/stripe/Stripe";
import {useRouter} from "next/navigation";
import sellerCheck from "@/app/utils/product/sellerCheck";
import {UserType} from "@/app/api/user/catchUser/route";


const Product = ({params}: { params: { id: string } }) => {
    const [loginUserData, setLoginUserData] = useState<UserType | undefined>(undefined)
    const [productVideo, setProductVideo] = useState<string>()
    console.log(productVideo)

    const token = localStorage.getItem("token");
    const user = useUser(token)
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
    console.log(JSON.stringify(product))

    // const [productLikeUpdate, setProductLikeUpdate] = useState<ProductType | null>(null)
    const [sameSellerStatus, setSameSellerStatus] = useState<boolean | null>(false)
    console.log(status)
    const [productLike, setProductLike] = useState<boolean>(false)
    const [images, setImages] = useState<string[]>([]);
    const [mainImage, setMainImage] = useState<string>("");

    const id = params?.id
    const productId = product?._id
    const likeButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setProductLike(!productLike)
        console.log(productLike)
        const productLikeData = async () => {
            if (id !== undefined || loginUserData !== undefined) {

                const result = await productLikeDate(id, loginUserData?._id)
                if (result == "mineProduct") {
                    window.alert("自分の商品にはいいねできないです。")
                }
                if (result == "notLogin") {
                    window.alert("ログインしていないといいねはできないです。")
                    setProductLike(false)
                }
            }
        }
        productLikeData()
    }
    useEffect(() => {

        if (user !== undefined) {
            const userParse = JSON.parse(user)
            setLoginUserData(JSON.parse(userParse));
        }
    }, [user, id, router]);

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
            if (loginUserData?._id !== undefined || loginUserData?._id !== null) {
                const sellerCheckCatch = await sellerCheck(id, loginUserData?._id)
                setSameSellerStatus(sellerCheckCatch)
                console.log(sellerCheckCatch)
            }
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

                setMainImage(instanceProductParse.productImage);  // メイン画像を初期化
                setImages([
                    instanceProductParse.productImage,
                    instanceProductParse.productImage2 || "",
                    instanceProductParse.productImage3 || "",
                    instanceProductParse.productImage4 || ""
                ]);
            }
            if (productCatchParse?.video !== undefined && productCatchParse?.video !== null) {
                const video = productCatchParse?.video
                // const blob = await video?.blob()
                // const url = URL.createObjectURL(blob)
                setProductVideo(video)
            }
        }

        response()
    }, [loginUserData?._id, id, router]);


    useEffect(() => {
        const userId: string | undefined = loginUserData?._id
        if (product?.productLike?.includes(userId!)) {
            setProductLike(true);
        }
    }, [product, loginUserData?._id]);

    const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        e.preventDefault();
        setMainImage(images[index]);  // クリックされた画像をメイン画像に設定
    };
    const isDesktop = window.innerWidth >= 768;

    return (
        <>
            <Header/>

            {/*<div className={"productMain"}>*/}

            {/*    <div id="cart">*/}
            <main className={"productMainDisplay"}>
                <div className={"productFlex"}>
                    {/*<Sidebar/>*/}

                    <div className="productMain">
                        {isDesktop ? (

                            <div id="info">
                                <div id={isDesktop ? "photo" : "responsiveProductMainImage"}>
                                    <figure>
                                        <Image src={mainImage !== undefined ? mainImage : "/images/clothes/product.jpg"}
                                               width={350} height={350}
                                               alt="商品の写真"/>
                                    </figure>
                                    <ul className="piclist">
                                        <li className="picts">
                                            {images.map((image, index) => (
                                                <li key={index} className="picts">
                                                    {image ? (
                                                        <a href="#" onClick={(e) => handleImageClick(e, index)}>
                                                            <Image className="pictS" src={image} width={50} height={50}
                                                                   alt={`画像${index + 1}`}/>
                                                        </a>
                                                    ) : null}
                                                </li>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                                <div id="text">
                                    <h1>{product?.productName}</h1>
                                    <span className="under_bar"></span>
                                    <Link href="/" id="seller">
                                        <h2>出品者:{product?.sellerUserName}</h2>

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
                                    <span className={"StripeButtonDisplay"}>
                                <p id="category">カテゴリ: ニット Sサイズ 春物 色</p>
                                        {/*<video src={`/api/fetchVideo/${product?._id}`}*/}
                                        {/*       loop autoPlay controls></video>*/}
                                        <div className={"ProductInStripe"}>

                            {product?.sellStatus == "販売中" ?
                                <>
                                    <div className={"ProductInHeart"}>
                                        <ThemeProvider theme={theme}>
                                            <Checkbox
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => likeButton(e)}
                                                size={"large"} checked={productLike} {...label}
                                                icon={<FavoriteBorder/>}
                                                checkedIcon={<Favorite/>}/>
                                        </ThemeProvider>
                                    </div>
                                </>
                                :
                                <></>
                            }
                                            {sameSellerStatus ?
                                                <Link href={`/listingScreenEdit/${productId}`}>編集する</Link> :
                                                <Stripe productId={product?._id}
                                                        sellingOrSoldOut={product?.sellStatus}/>}
                                </div>
                            </span>
                                </div>
                            </div>
                        ) : (
                            <div id="info">
                                <div id={isDesktop ? "photo" : "responsiveProductMainImage"}>
                                    <figure>
                                        <Image src={mainImage !== undefined ? mainImage : "/images/clothes/product.jpg"}
                                               width={350} height={350}
                                               alt="商品の写真"/>
                                    </figure>
                                    <ul className="piclist">
                                        <li className="picts">
                                            {images.map((image, index) => (
                                                <li key={index} className="picts">
                                                    {image ? (
                                                        <a href="#" onClick={(e) => handleImageClick(e, index)}>
                                                            <Image className="pictS" src={image} width={50} height={50}
                                                                   alt={`画像${index + 1}`}/>
                                                        </a>
                                                    ) : null}
                                                </li>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                                <div id="text">
                                    <h1>{product?.productName}</h1>
                                    <span className="under_bar"></span>
                                    <Link href="/" id="seller">
                                        <h2>出品者<br/>{product?.sellerUserName}</h2>

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
                                    {/*<video src={`/api/fetchVideo/${product?._id}`}*/}
                                    {/*       loop autoPlay controls></video>*/}
                                    <div className={"ProductInStripe"}>

                                        {product?.sellStatus == "販売中" ?
                                            <>
                                                <div className={"ProductInHeart"}>
                                                    <ThemeProvider theme={theme}>
                                                        <Checkbox
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => likeButton(e)}
                                                            size={"large"} checked={productLike} {...label}
                                                            icon={<FavoriteBorder/>}
                                                            checkedIcon={<Favorite/>}/>
                                                    </ThemeProvider>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <ThemeProvider theme={theme}>
                                                    <Checkbox
                                                        size={"large"} checked={productLike} {...label}
                                                        icon={<FavoriteBorder/>}
                                                        checkedIcon={<Favorite/>}/>
                                                </ThemeProvider>
                                            </>
                                        }
                                        {sameSellerStatus ?
                                            <Link href={`/listingScreenEdit/${productId}`}>編集する</Link> :
                                            <Stripe productId={product?._id}
                                                    sellingOrSoldOut={product?.sellStatus}/>}
                                    </div>
                                </div>
                            </div>

                        )}


                        <div>
                            <Chat paramsProductData={id}/>
                        </div>
                    </div>
                </div>


            </main>
            <Footer/>
        </>
    );
}


export default Product;
