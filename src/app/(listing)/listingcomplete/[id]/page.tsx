"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./listingcomplete.css"
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Images from "next/image";
import Link from "next/link";
import productDetail, {ProductType} from "@/app/utils/product/productDetail";

const ListingComplete = ({params}: { params: { id: string } }) => {

    const [data, setData] = useState<string | null>("")
    console.log(data)
    const id = params.id
    console.log(id)
    useEffect(() => {
        if (id) {
            const productData = async () => {
                const result = await productDetail(id)
                const resultParse =  result?.product
                setData(resultParse)
            }
            productData()
        }
    }, [])
    return (
        <>
            <Header/>
            <div id="productlisning">
                <h1 className={"liscomph2"}>出品が完了しました。</h1>
                <div id="info">
                    <div id="photo">
                        <Image className={"proimg"} src="/images/clothes/product.jpg" width={400} height={400}
                               alt="サンプル" id="sum"/>
                        <ul className="piclist">
                            <li className="picts"><a href="/images/clothes/product.jpg">
                                <Image className="pictS" src="/images/clothes/product.jpg" width={50} height={50}
                                       alt="画像1"/></a>
                            </li>

                        </ul>
                    </div>
                    <div id="text">
                        <h1 className={"liscomph2"}>{data?.productName}</h1>
                        <span className="under_bar"></span>
                        <a href="#" id="seller"><h2>出品者:{data?.sellerUserName}</h2>
                            <Images src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                                    alt={"サンプルユーザーアイコン"}/>
                        </a>
                        <p>
                            {data?.productDesc}
                        </p>

                        <p id="size">サイズ:{data?.productSize}</p>
                        <p id="used">商品状態:{data?.productCondition}</p>
                        <p id="postage">送料:{data?.postageBurden}</p>
                        <p id="category">カテゴリ: {data?.productCategory}</p>
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
}


export default ListingComplete;