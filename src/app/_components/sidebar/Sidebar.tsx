import React from 'react';
import "./Sidebar.css"
import Image from  "next/image"
import Link from "next/link";

const Sidebar = () => {

    return (
        <div className="Sintroduction">

            <div className="Ssidebar">
                <div className="Scart">
                    <h1>
                        Cart
                    </h1>
                    <p>
                        <Image src={"/images/Cart_icon.png"} width={50}  height={50}/>
                    </p>
                </div>
                <hr id="side_line"/>

                <div className="Scart_inProduct">
                    <figure>
                        <Image src="/images/clothes/product9.jpg" width={200} height={200} alt="商品の写真"/>
                    </figure>
                    <ul>
                        <li>ニット</li>
                        <li>出品者:Yuuna</li>
                        <li>価格:2800</li>
                    </ul>


                </div>
                <Link href={"product"} id="side_product_detail">
                    商品ページ
                </Link>
                <p id="total_price">
                    合計金額
                </p>
                <p id="total_yen">
                    2800円
                </p>


            </div>

        </div>
    );
}


export default Sidebar;