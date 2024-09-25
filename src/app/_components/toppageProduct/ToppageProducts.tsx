import React from 'react';
import "./toppageProducts.css"
import Product from "@/app/product/page";
import Image from "next/image"
import Link from "next/link";
import {products} from "@/app/api/dummyData/data";
import {productsProps} from "@/app/api/dummyData/data";

const ToppageProducts = () => {
    const data: productsProps[] = products
    return (

        <div className={"new_Prodct"}>
            <div id={"newArrival_title"}>
                <h2>New Arrival</h2>
                <p>新着商品</p>
            </div>

            <span>
                <div className={"flower_images"}>

                <Image id={"flower_img1"} className={"flower_image"} src={"/images/flowers/flower.png"} width={300}
                       height={300} alt={"花の画像"}/>
                <Image id={"flower_img2"} className={"flower_image"} src={"/images/flowers/flower2.png"} width={600}
                       height={600} alt={"花の画像"}/>
                <Image id={"flower_img3"} className={"flower_image"} src={"/images/flowers/flower3.png"} width={300}
                       height={300} alt={"花の画像"}/>
                <Image id={"flower_img4"} className={"flower_image"} src={"/images/flowers/flower4.png"} width={300}
                       height={300} alt={"花の画像"}/>
                </div>
            </span>
            <div className={"Productlist"}>
                <div style={{width: "1200px", display: "block"}}>


                    <div className={"products"}>
                        <div className="productlist">
                            <div className="productlist_toppage_item">


                            {data.map((item, index) => (
                                <div key={index} className="product_img">
                                    <div  className="product_detail">
                                        <Image className={"productImage"} src={item.productImage} width={200}
                                               height={200} alt="商品画像"/>
                                        <p>{item.productName}</p>
                                        <p>出品者<br/>{item.author.userName}</p>
                                        <p>価格:{item.price}</p>
                                    </div>
                                </div>
                            ))
                            }
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
)
    ;
};

export default ToppageProducts;