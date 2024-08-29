"use client"
import React from 'react';
import Image from "next/image";
import "./trade.css"
import Header from "@/app/_components/header/Header";
import Chat from "@/app/_components/chat/Chat";
import {Rating, Typography} from "@mui/material";

const ListingComplete = () => {
    const [value, setValue] = React.useState<number | null>(2);
    return (
        <>
            <Header/>
            <div id="product">
                <div id="info">

                    <div id="photo">
                        <Image src="/images/sample01.jpg" width={400} height={400} alt="サンプル" id="sum"/>
                        <ul className="piclist">
                            <li className="picts"><a href="/images/sample01.jpg">
                                <Image className="pictS" src="/images/sample01.jpg" width={50} height={50} alt="画像1"/></a>
                            </li>
                            <li className="picts"><a href="/images/pic_fish.jpg"><Image
                                className="pictS" src="/images/pic_fish.jpg" width={50} height={50} alt="画像1"/></a>
                            </li>
                        </ul>
                    </div>
                    <div id="text">
                        <h1>商品名</h1>
                        <span className="under_bar"></span>
                        <a href="#" id="seller"><h2>出品者:User01</h2>
                            <Image width={23} height={2} src="/images/pic_car.jpg" alt="icon"/>
                        </a>
                        <p>
                            商品詳細がここに入ります。<br/>
                            この部分は出品者が書くテキストです。<br/>
                            手放す理由、手触りや重さなどを書いてください。
                        </p>
                        <p id="size">サイズ:S</p>
                        <p id="used">使用状況:多少使用感がある</p>
                        <p id="postage">送料:出品者負担</p>
                        <p id="category">カテゴリ: ワンピース Sサイズ 春物 色</p>
                    </div>

                </div>
                <Chat/>
                <div className={"evaluation"}>
                    <div className={"evaluation_Chat"}>
                        <h2>最終コメント</h2>
                        <input type="text" name="msg"  placeholder="今回の取引はどうでしたか？"/>
                    </div>
                    <div>

                        <Typography component="legend" style={{marginBottom :"30px"}}>今回の取引の評価</Typography>
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