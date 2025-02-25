"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./listingcomplete.css";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Link from "next/link";
import productDetail, {ProductType} from "@/app/utils/product/productDetail";

const ListingComplete = ({params}: { params: { id: ProductType } }) => {
    const [data, setData] = useState<ProductType | undefined | null>(null);
    const id = params.id;
    console.log(data)
    const [mainImage, setMainImage] = useState<string | undefined | null>(null);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            const productData = async () => {
                const result = await productDetail(id);
                if (result?.product !== undefined) {
                    const resultParse = JSON.parse(result.product);
                    setData(resultParse);
                    setMainImage(resultParse.productImage);  // メイン画像を初期化
                    setImages([
                        resultParse.productImage || "",
                        resultParse.productImage2 || "",
                        resultParse.productImage3 || "",
                        resultParse.productImage4 || ""
                    ]);
                }
            };
            productData();
        }
    }, [id]);

    const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        e.preventDefault();
        setMainImage(images[index]);  // クリックされた画像をメイン画像に設定
    };

    return (
        <>
            <Header/>
            <div id="productlisning">
                <h1 className={"liscomph2"}>出品が完了しました。</h1>
                <div id="info">
                    <div id="photo">
                        {mainImage !== null && mainImage !== undefined ?
                            <Image className={"proimg"}
                                   src={mainImage}
                                   width={400} height={400}
                                   alt="サンプル" id="sum"/> :
                            <Image className={"proimg"}
                                   src={"/images/clothes/product.jpg"}
                                   width={400} height={400}
                                   alt="サンプル" id="sum"/>
                        }
                        <ul className="piclist">
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
                        </ul>
                    </div>
                    <div id="text">
                        <h1 className={"liscomph2"}>{data?.productName}</h1>
                        <span className="under_bar"></span>
                        <div id="seller">

                            出品者:
                            <svg style={{color: "#000"}} xmlns="http://www.w3.org/2000/svg" width={50} height={50}
                                 viewBox="0 0 24 24">
                                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                                    <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/>
                                    <path
                                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z"/>
                                </g>
                            </svg>
                            <h2>
                                {data?.sellerUserName}</h2>
                        </div>
                        <p>{data?.productDesc}</p>
                        <p id="size">サイズ:{data?.productSize}</p>
                        <p id="used">商品状態:{data?.productCondition}</p>
                        <p id="postage">送料:{data?.postageBurden}</p>
                        <p id="category">カテゴリ: {data?.productCategory}</p>
                        {/*<video src={productVideo !== undefined && productVideo !== null ? productVideo : ""} loop*/}
                        {/*       autoPlay></video>*/}
                    </div>
                </div>

                <div id="control">
                    <Link href={""}>
                        <button type="button" className={"listingCompleteButton"}>
                            編集する
                        </button>
                    </Link>
                    <Link href={"/"}>
                        <button type="button" className={"listingCompleteButton"}>
                            トップに戻る
                        </button>
                    </Link>
                </div>

            </div>
            <Footer/>
        </>
    );
};

export default ListingComplete;
