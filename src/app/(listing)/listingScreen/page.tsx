import React from 'react';
import Header from "@/app/_components/header/Header";
import "./listingScreen.css"
import Image from "next/image"
import ListingScreenRadiobutton from "@/app/_components/listingScreenRadiobutton/ListingScreenRadiobutton";
import Link from 'next/link';

const ListingScreen = () => {

    return (
        <>
            <Header/>
                <div className={"content"}>
                    <div className={"listingScreenBackground"}>
                    <h2>
                        出品情報
                    </h2>

                    <div id="kamera">
                        <Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>
                    </div>

                    </div>

                    <h3 id="s_name">
                        商品名
                    </h3>


                    <input type="text" className="txtInput"/>

                    <h3 className="kakaku">
                        価格
                    </h3>


                    <input type="text" className="txtInput" value="¥"/>

                    <h3 id="s_name">
                        商品詳細
                    </h3>

                    <input type="text" className="txtInput"/>


                    <h3 className="cat">
                        カテゴリ
                    </h3>
                    <ListingScreenRadiobutton/>

                    <h3 id="s_name">
                        発送地域
                        {/*ユーザーから取得*/}
                    </h3>

                    <input type="text" className="txtInput"/>

                </div>

                <div className={"ListingBtn"}>
                    <button className={"listingCancelbtn"}>
                        <Link href={"toppage"}>

                        <p>キャンセル</p>
                        </Link>
                    </button>

                    <button className={"listingcompletebtn"}>
                        <Link href={"listingcomplete"}>
                            <p>出品</p>
                        </Link>
                    </button>
                </div>

        </>
    );
}


export default ListingScreen;