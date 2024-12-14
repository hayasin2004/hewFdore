import React from 'react';
import Image from "next/image";
import "./common.css"

const ToppageSite3 = () => {
    return (
        <div className="siteunbermain">
            <div >
                <h2>
                    Staff Blog
                </h2>
                <ul className={"site3"}>
                    <ul >
                        <li>
                         <p className={"tatemozi"}>
                             Staff Blog
                         </p>
                        </li>
                    </ul>
                    <li>
                        <Image className={"image"} src={"/images/clothes/product.jpg"} width={380} height={380}
                            alt={"購入履歴"}/>
                        <p>aaaaaaaaaaaa</p>
                    </li>
                    <li>
                        <Image className={"image"} src={"/images/clothes/product.jpg"} width={380} height={380}
                       alt={"購入履歴"}/>
                        <p>bbbbbbbbbbbb</p>
                    </li>
                    <li>
                        <Image className={"image"} src={"/images/clothes/product.jpg"} width={380} height={380}
                       alt={"購入履歴"}/>
                        <p>cccccccccccccc</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};


export default ToppageSite3;