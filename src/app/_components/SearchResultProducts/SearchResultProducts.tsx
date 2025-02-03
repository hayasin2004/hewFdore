import React from 'react';
import "./SearchResultProducts.css"
import Image from "next/image"
import Link from "next/link";
import SearchHeader from "@/app/_components/searchHeader/SearchHeader";
import {productsProps} from "@/app/api/dummyData/data";


const SearchResultProducts  = ( ) => {

    return (
        <>
            <div className={"searchResultOverflow"} >


                <h1 style={{marginTop:"80px"}}>XXXX件の検索結果</h1>
                <div className="SRproductlist">
                    <div className="SRproductlist__item">


                    </div>

                    {/*<div className="product_img">*/}

                    {/*    <div className="product_detail">*/}
                    {/*        <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>*/}
                    {/*        <p>商品名</p>*/}
                    {/*        <p>username</p>*/}
                    {/*        <p>価格:2000円</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="product_detail">*/}
                    {/*        <Image src="/images/dami.png" width={200} height={200} alt="商品画像"/>*/}
                    {/*        <p>商品名</p>*/}
                    {/*        <p>username</p>*/}
                    {/*        <p>価格:2000円</p>*/}
                    {/*    </div>*/}


                    {/*</div>*/}

                </div>


                <hr id="line"/>


                <div className="Nextpage">
                    <div className={"SRNextPageNav"}>

                        <p className="SRp">500件の検索表示</p>
                        <div>
                            <Link className={"SRnextPageNum"}  href={"/"}>1</Link>
                            <Link className={"SRnextPageNum"}  href={"/"}>2</Link>
                            <Link className={"SRnextPageNum"}  href={"/"}>3</Link>
                            <Link className={"SRnextPageNum"}  href={"/"}>4</Link>
                            <Link className={"SRnextPageNum"}  href={"/"}>5</Link>
                        </div>

                    </div>

                </div>
            </div>


        </>
    );
}


export default SearchResultProducts;