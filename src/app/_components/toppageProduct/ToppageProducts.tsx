import React from 'react';
import "./toppageProducts.css"
import Product from "@/app/product/page";
import Image from "next/image"
import Link from "next/link";

const ToppageProducts = () => {
    return (

        <div className={"new_Prodct"}>
            <div id={"newArrival_title"}>
                <h2>New Arrival</h2>
                <p>新着商品</p>
            </div>

            <span>
                <div className={"flower_images"}>

                <Image id={"flower_img1"} className={"flower_image"} src={"/images/flowers/flower.png"} width={300} height={300}  alt={"花の画像"}/>
                <Image id={"flower_img2"}  className={"flower_image"} src={"/images/flowers/flower2.png"} width={600} height={600} alt={"花の画像"}/>
                <Image id={"flower_img3"} className={"flower_image"} src={"/images/flowers/flower3.png"} width={300} height={300}  alt={"花の画像"}/>
                <Image id={"flower_img4"} className={"flower_image"} src={"/images/flowers/flower4.png"} width={300} height={300}  alt={"花の画像"}/>
                </div>
            </span>
            <div className={"Productlist"}>
                <div style={{width: "1200px", display: "block"}}>


                    <div className={"products"}>
                        <div className="productlist">
                            <div className="productlist__item">


                            </div>
                            <div className="product_img">

                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>ニット</p>
                                    <p>出品者<br/>Akari</p>
                                    <p>価格:2000円</p>
                                </div>
                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product2.jpg" width={200} height={200} alt="商品画像"/>

                                    <p>コート</p>
                                    <p>出品者<br />Yumi</p>
                                    <p>価格:7000円</p>
                                </div>


                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product3.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>キャミソール</p>
                                    <p>出品者<br />Hana</p>
                                    <p>価格:1500円</p>
                                </div>

                            </div>
                        </div>
                        <div className="productlist">
                            <div className="productlist__item">


                            </div>
                            <div className="product_img">

                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product4.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>秋服セット</p>
                                    <p>出品者<br />Yuki</p>
                                    <p>価格:12000円</p>
                                </div>
                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product5.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>香水</p>
                                    <p>出品者<br />Koharu</p>
                                    <p>価格:2000円</p>
                                </div>


                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product6.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>スカート</p>
                                    <p>出品者<br />Uika</p>
                                    <p>価格:3000円</p>
                                </div>

                            </div>
                        </div>

                        <div className="productlist">
                            <div className="productlist__item">


                            </div>
                            <div className="product_img">

                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product7.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>カーディガン</p>
                                    <p>出品者<br />Ai</p>
                                    <p>価格:4000円</p>
                                </div>
                                <div className="product_detail">
                                    <Image className={"productImage"} src="/images/clothes/product8.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>ワンピース</p>
                                    <p>出品者<br />Rin</p>
                                    <p>価格:5000円</p>
                                </div>


                                <div className="product_detail">
                                    <Image  className={"productImage"} src="/images/clothes/product9.jpg" width={200} height={200} alt="商品画像"/>
                                    <p>ニット</p>
                                    <p>出品者<br />Yuuna</p>
                                    <p>価格:2800円</p>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

                <hr id="line"/>


                <div className="Nextpage">
                    <div className={"NextPageNav"}>
                        <div className={"Nextpagelist"}>

                            <p>500件の検索表示</p>
                            <div>
                                <Link className={"nextPageNum"} href={"/"}>1</Link>
                                <Link className={"nextPageNum"} href={"/"}>2</Link>
                                <Link className={"nextPageNum"} href={"/"}>3</Link>
                                <Link className={"nextPageNum"} href={"/"}>4</Link>
                                <Link className={"nextPageNum"} href={"/"}>5</Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ToppageProducts;