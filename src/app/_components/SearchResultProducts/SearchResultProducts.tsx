import React from 'react';
import "./SearchResultProducts.css"
import Image from "next/image"
import Link from "next/link";
import SearchHeader from "@/app/_components/searchHeader/SearchHeader";

const SearchResultProducts = () => {

    return (
        <>
            <div style={{width: "1200px", display: "block"}}>


                <h1 style={{marginTop:"80px"}}>XXXX件の検索結果</h1>
                <div className="productlist">
                    <div className="product_img">

                        <div className="product_detail">
                        <Link href={"/product" }>
                            <Image src="/images/sample01.jpg" width={200} height={200} alt="商品画像"/>
                            <p>商品名</p>
                            <p>username</p>
                            <p>価格:2000円</p>
                        </Link>
                        </div>
                        <div className="product_detail">
                            <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>
                            <p>商品名</p>
                            <p>username</p>
                            <p>価格:2000円</p>
                        </div>
                        <div className="product_detail">
                            <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>
                            <p>商品名</p>
                            <p>username</p>
                            <p>価格:2000円</p>
                        </div>


                    </div>

                </div>
                <div className="productlist">

                    <div className="product_img">
                        <div className="product_detail">
                            <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>
                            <p>商品名</p>
                            <p>username</p>
                            <p>価格:2000円</p>
                        </div>

                        <div className="product_detail">
                            <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>
                            <p>商品名</p>
                            <p>username</p>
                            <p>価格:2000円</p>
                        </div>
                        <div className="product_detail">
                            <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>
                            <p>商品名</p>
                            <p>username</p>
                            <p>価格:2000円</p>
                        </div>

                    </div>

                </div>

                <hr id="line"/>


                <div className="Nextpage">
                    <div className={"NextPageNav"}>

                        <p>500件の検索表示</p>
                        <div>
                            <Link className={"nextPageNum"}  href={"/"}>1</Link>
                            <Link className={"nextPageNum"}  href={"/"}>2</Link>
                            <Link className={"nextPageNum"}  href={"/"}>3</Link>
                            <Link className={"nextPageNum"}  href={"/"}>4</Link>
                            <Link className={"nextPageNum"}  href={"/"}>5</Link>
                        </div>

                    </div>

                </div>
            </div>


        </>
    );
}


export default SearchResultProducts;