import React from 'react';
import Header from "@/app/_components/header/Header";
import Image from "next/image";
import "./paidNote.css"
import Link from "next/link";

const PaidNote = () => {

    return (
        <>

            <span id={"btn"}>
                    <Link href={"toppage"}>
                <button>


                    戻る
                </button>
                    </Link>
            </span>
            <div className={"paidText"}>
                <h2>
                    あなたの購入履歴
                </h2>
            </div>
            <div className={"listing"}>
                <div className={"listing_product"}>
                    <div className={"product"}>
                        <Image src={"/images/sample01.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                    </div>
                    <div className={"listingText"}>
                        <h3>評価</h3>
                        <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                    </div>
                    <div className={"product"}>
                        <Image src={"/images/sample01.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                    </div>
                    <div className={"listingText"}>
                        <h3>評価</h3>
                        <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                    </div>
                </div>
            </div>
            <div className={"listing"}>
                <div className={"listing_product"}>
                    <div className={"product"}>
                        <Image src={"/images/sample01.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                    </div>
                    <div className={"listingText"}>
                        <h3>評価</h3>
                        <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                    </div>
                    <div className={"product"}>
                        <Image src={"/images/sample01.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                    </div>
                    <div className={"listingText"}>
                        <h3>評価</h3>
                        <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjasdfasdfsadfasdfsdafasdfsdafasdfasdfasdwfasdfasdfasdfdsawff;</p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default PaidNote;