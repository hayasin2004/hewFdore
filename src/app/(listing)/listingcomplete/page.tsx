"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./listingcomplete.css"
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Images from "next/image";

const ListingComplete = () => {
    useEffect(() => {
    async function fetchData() {
        try {
        const response = await  fetch("/api/product")
            if (!response.ok){
                console.log("むりやった")
            }
            const productData = await response.json();
            console.log(JSON.stringify(productData))
        }catch (err){
            console.log(err)
        }
    }
    fetchData()
    }, []);

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
                    <h1 className={"liscomph2"}>ニット</h1>
                    <span className="under_bar"></span>
                    <a href="#" id="seller"><h2>出品者:Hal</h2>
                        <Images src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                                alt={"サンプルユーザーアイコン"}/>
                    </a>
                    <p>
                        商品詳細がここに入ります。<br/>
                        この部分は出品者が書くテキストです。<br/>
                        手放す理由、手触りや重さなどを書いてください。
                    </p>
                    <p id="size">サイズ:M</p>
                    <p id="used">商品状態:使用感がある</p>
                    <p id="postage">送料:出品者負担</p>
                    <p id="category">カテゴリ: トップス Mサイズ</p>
                </div>
            </div>

            <div id="control">
                <button
                    type="button">編集する
                </button>
                <button
                    type="button">トップに戻る
                </button>
            </div>

        </div>
            <Footer/>

    </>

);
}


export default ListingComplete;