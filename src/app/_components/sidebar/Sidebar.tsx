import React from 'react';
import Image from  "next/image"
import Link from "next/link";
import "./Sidebar.css"
const Sidebar = () => {

    return (
        <div className="introductionSidebar">

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



            </div>

        </div>
    );
}


export default Sidebar;