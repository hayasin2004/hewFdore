import React from 'react';
import Image from "next/image";
import "./listingcomplete_itiosikinou.css"
import Header from "@/app/_components/header/Header";
const ListingComplete = () => {

    return (
        <>
            <Header/>
        <div id="product">
            <h1>出品が完了しました。</h1>
            <div id="info">


                <div id="photo">
                    <div>
                        <video src="/videos/sumple.mp4" width="400" height="400" loop autoPlay/>
                    </div>
                    <ul className="piclist">
                        <li className="picts"><a href="/images/sample01.jpg">
                            <video src="/videos/sumple.mp4" width="50" height="50" loop autoPlay={false}/>
                        </a>
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

            <div id="control">
                <button
                    type="button">編集する
                </button>
                <button
                    type="button">トップに戻る
                </button>
            </div>

        </div>

        </>

    );
}


export default ListingComplete;