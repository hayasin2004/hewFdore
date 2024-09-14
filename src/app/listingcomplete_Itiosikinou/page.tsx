import Link from "next/link";
import React from 'react';
import Image from "next/image";
import "./listingcomplete_itiosikinou.css"
import Header from "@/app/_components/header/Header";
import Images from "next/image";

const ListingComplete = () => {

    return (
        <>
            <Header/>
            <div id="product">
                <h1>出品が完了しました。</h1>
                <div id="info">


                    <div id="photo">
                        <div>
                            <video src="/videos/sampleproduct.mp4" width="400" height="400" loop autoPlay/>
                        </div>
                        <ul className="piclist">
                            <li className="picts"><a href="/images/clothes/product.jpg">
                                <video src="/videos/sampleproduct.mp4" width="50" height="50" loop autoPlay={false}/>
                            </a>
                            </li>
                        </ul>
                    </div>
                    <div id="text">
                        <h1>シャツ</h1>
                        <span className="under_bar"></span>
                        <a href="#" id="seller">
                            <h2>出品者: </h2>
                            <Images src={"/images/sampleIcon.jpg"} style={{borderRadius: "50px"}} width={50} height={50}
                                    alt={"サンプルユーザーアイコン"}/>
                            <h2>HAl</h2>
                        </a>
                        <p>
                            長く愛用していました。<br/>
                            ですが新しいと服と出会いたいと思い手放したいと思います。<br/>
                        </p>
                        <p id="size">サイズ:S</p>
                        <p id="used">商品状態:多少使用感がある</p>
                        <p id="postage">送料:出品者負担</p>
                        <p id="category">カテゴリ: ワンピース Sサイズ 秋者 色</p>
                    </div>
                </div>

                <div id="control">
                    <button
                        type="button">編集する
                    </button>
                    <Link href={"toppage"}>

                        <button
                            type="button">トップに戻る
                        </button>
                    </Link>
                </div>

            </div>

        </>

    );
}


export default ListingComplete;