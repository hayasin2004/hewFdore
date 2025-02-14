import React from 'react';
import "./Cart.css"
import Image from "next/image";
const Cart = () => {

    return (
        <div className={"cartList"}>
            <form id="input_buy" action="pay_confirm.html">
                <div id="cart">

                    <h2>カート一覧</h2>
                    <Image src={"/images/Cart_icon.png"} className="icon" width={20} height={20} alt="カートアイコン"/>
                    {/*//  ここに商品*/}
                    <div className="goods">
                        <label htmlFor="goods_0">1品目</label>
                        <input type="checkbox" name="goods_0" id="goods_0"/>

                        <div className="goods_box">
                            <Image src={"/images/clothes/product.jpg"} width={150} height={150} alt="商品画像"/>
                            <div className="goods_desc">
                                <h3>ニット上着</h3>
                                <p>出品者:User02 さん<br/>
                                    価格: 2000 円<br/>
                                    配送予定: 1~2日以内</p>
                            </div>
                        </div>
                    </div>
                    <div className="goods">
                        <label htmlFor="goods_0">1品目</label>
                        <input type="checkbox" name="goods_0" id="goods_0"/>

                        <div className="goods_box">
                            <Image src={"/images/clothes/product.jpg"} width={150} height={150} alt="商品画像"/>
                            <div className="goods_desc">
                                <h3>ニット上着</h3>
                                <p>出品者:User02 さん<br/>
                                    価格: 2000 円<br/>
                                    配送予定: 1~2日以内</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="total">
                    <p>
                        x 個の商品 <br/>
                        小計: xxx 円 <br/>
                        付与ポイント: xx pt
                    </p>

                    <button type="submit">支払いに進む</button>
                </div>
            </form>
        </div>

    );
}


export default Cart;