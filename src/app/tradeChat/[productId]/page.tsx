"use client"
import React, {useEffect} from 'react';
import Image from "next/image";
import "./trade.css"
import Header from "@/app/_components/header/Header";
import Chat from "@/app/_components/chat/Chat";
import {Rating, Typography} from "@mui/material";
import tradeProduct from "@/app/utils/product/tradeProduct";

const ListingComplete = ({params}: { params: { id: string | null } }) => {
    const [value, setValue] = React.useState<number | null>(0.5);
    useEffect(() => {
        const purchaseId = JSON.parse(JSON.stringify(params.productId))
        const purchase = async () => {
            const response = await tradeProduct(purchaseId);
        }
        purchase()
    }, [])

    console.log(Rating)
    return (
        <>
            <Header/>
            <div id="product">
                <div id="info">

                    <div id="photo">
                        <Image src="/images/clothes/product9.jpg" width={400} height={400} alt="商品の写真"/>

                        <ul className="piclist">
                            <li className="picts"><a href="/images/clothes/product9.jpg">
                                <Image src="/images/clothes/product9.jpg" width={50} height={50} alt="商品の写真"/>
                            </a>

                            </li>

                        </ul>
                    </div>
                    <div id="text">
                        <h1>ニット</h1>
                        <span className="under_bar"></span>
                        <a href="#" id="seller"><h2>出品者:Yuuna</h2>
                        </a>
                        <p>
                            商品詳細<br/>
                            去年の冬に入って購入したものになります。<br/>

                        </p>
                        <p id="size">サイズ:S</p>
                        <p id="used">商品状態:多少使用感がある</p>
                        <p id="postage">送料:出品者負担</p>
                        <p id="category">カテゴリ: ワンピース Sサイズ 春物 色</p>
                    </div>

                </div>
                <Chat/>
                <div className={"evaluation"}>
                    <div className={"evaluation_Chat"}>
                        <h2>最終コメント</h2>
                        <input type="text" name="msg" placeholder="今回の取引はどうでしたか？"/>
                    </div>
                    <div>

                        <Typography component="legend" style={{marginBottom: "30px"}}>今回の取引の評価</Typography>
                        <Rating
                            size={"large"}
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />


                    </div>
                </div>
                <div id="control">
                    <button
                        type="button">トップに戻る
                    </button>
                </div>

            </div>

        </>

    );
}


export default ListingComplete;