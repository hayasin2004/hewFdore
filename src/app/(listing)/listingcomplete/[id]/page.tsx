"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./listingcomplete.css";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Images from "next/image";
import Link from "next/link";
import productDetail, {ProductType} from "@/app/utils/product/productDetail";

const ListingComplete = ({params}: { params: { id: string } }) => {
    const [data, setData] = useState<ProductType | null>(null);
    const [productVideo, setProductVideo] = useState<ProductType | null>(null);
    const id = params.id;

        const [mainImage, setMainImage] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            const productData = async () => {
                const result = await productDetail(id);
                if (result?.product !== undefined && result?.product !== null) {
                    const resultParse: ProductType = JSON.parse(result?.product);
                    setData(resultParse);
                    setMainImage(resultParse.productImage);  // メイン画像を初期化
                    setImages([
                        resultParse.productImage,
                        resultParse.productImage2 || "",
                        resultParse.productImage3 || "",
                        resultParse.productImage4 || ""
                    ]);
                }
                if (result?.video !== undefined && result?.video !== null) {
                    const resultParse: ProductType = JSON.parse(result?.video);
                    setProductVideo(resultParse);
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
                        <Image className={"proimg"}
                               src={mainImage !== undefined ? mainImage : "/images/clothes/product.jpg"}
                               width={400} height={400}
                               alt="サンプル" id="sum"/>
                        <ul className="piclist">
                            {images.map((image, index) => (
                                <li key={index} className="picts">
                                    {image ? (
                                        <a href="#" onClick={(e) => handleImageClick(e, index)}>
                                            <Image className="pictS" src={image} width={50} height={50} alt={`画像${index + 1}`} />
                                        </a>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="text">
                        <h1 className={"liscomph2"}>{data?.productName}</h1>
                        <span className="under_bar"></span>
                        <a href="#" id="seller">
                            <h2>出品者:{data?.sellerUserName}</h2>
                            <Images src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                                    alt={"サンプルユーザーアイコン"}/>
                        </a>
                        <p>{data?.productDesc}</p>
                        <p id="size">サイズ:{data?.productSize}</p>
                        <p id="used">商品状態:{data?.productCondition}</p>
                        <p id="postage">送料:{data?.postageBurden}</p>
                        <p id="category">カテゴリ: {data?.productCategory}</p>
                        <video src={productVideo !== undefined && productVideo !== null ? productVideo : ""} loop autoPlay></video>
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
