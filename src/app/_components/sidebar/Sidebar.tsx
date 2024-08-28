import React from 'react';
import "./Sidebar.css"
import Image from  "next/image"

const Sidebar = () => {

    return (
        <div className="introduction">

            <div className="sidebar">
                <div className="cart">
                    <h1>
                        Cart
                    </h1>
                    <p>
                        ○
                    </p>
                </div>
                <hr id="side_line"/>

                <div className="cart_inProduct">
                    <figure>
                        <Image src="/images/pic_car.jpg" width={200} height={200} alt="商品の写真" />
                    </figure>
                    <ul>
                        <li>ワンピース</li>
                        <li>出品者:〇〇〇〇</li>
                        <li>価格:〇〇〇〇</li>
                    </ul>
                </div>
                <p id="total_price">
                    合計金額
                </p>
                <p id="total_yen">
                    〇〇〇〇円
                </p>
                <a href="#" id="side_product_detail">
                    商品ページ
                </a>


            </div>

        </div>
    );
}


export default Sidebar;