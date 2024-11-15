import React from 'react';
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Image from "next/image";
import "./paidNote.css"
import Link from "next/link";

const PaidNote = () => {

    return (
        <>
            <Header/>
            <span id={"btn"}>
                    <Link href={"toppage"}>
                <button>


                    戻る
                </button>
                    </Link>
            </span>
            <div className={"paidText"}>
                <h2 id={"PNtitle"}>
                    購入履歴
                </h2>
            </div>
            <div className={"listing"}>
                <div className={"listing_product"}>
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>

                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>

                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}


export default PaidNote;