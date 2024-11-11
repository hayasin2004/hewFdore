"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import SearchHeader from "@/app/_components/searchHeader/SearchHeader";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import SearchResultProducts from "@/app/_components/SearchResultProducts/SearchResultProducts";
import {DBProductType} from "@/app/api/product/route";
// ダミーデータ取得
import {products as data} from "../api/dummyData/data"
import {productsProps} from "../api/dummyData/data";


export interface ProductType {
    productId? : string | null;
    userId? : string;
    productName? : string;
    productDesc? : string;
    productPrice? : number;
}



const Page = () => {
    const [productList, setProductList] = useState<DBProductType[]>([])
    console.log(JSON.stringify(productList) + "取得")

    // 商品一覧の取得
    // searchResultにアクセスしたときのみ限りuseEffectでデータを取得してくる。
    useEffect(() => {
        // データベースのやり取りの前提知識
        // async　, await , fetchでapp/api/productの中にアクセスしてる
        // async　, await(Promise)は非同期通信にするためのもの
        // fetch　はHTTPリクエストを送信している。今回の場合は商品一覧を取得したいので、GETメソッドをapp/api/productに送信している。

        // この書き方冗長化だからなおしたい
        const CallProductList = async function data() {

            //  やりとり。
            //  .thenはプロミスチェーンといわれる書き方。fetchで取得してきたものをitemsに配列型で渡している。　気持ちmap関数と激似。
            await fetch("/api/product").then(async (items) => {
                // 基本的に非同期通信はtry,catchで一回のみ試す。成功はtry ,失敗したら catch
                try {
                    //    もし取得してきたのに空が返ってきたときのエラー対処。　catchがあるからほぼ必要ない。
                    if (!items) {
                        console.log("商品の取得に失敗しました")
                    }
                    // データのやり取りは文字列形式つまりjson形式を使う。　これを非同期で行う。
                    //    {key : value }
                    const productData : DBProductType[] = await items.json()

                    console.log(productData)
                    //    取得してきたitemsをproductDataとしてsetProductListに代入。後はmap関数で一個一個取り出せばおっけーい
                    setProductList(productData)
                    console.log("success")
                } catch (err) {
                    console.log("Error" + err)

                }
            })
            // console.log(JSON.stringify(productData))
        }
        CallProductList()
    }, []);


    //
    // // 商品を展開

    const product : DBProductType[]   = productList.map((item) => {
        return {...item ,id : item._id}
        }
    )


    // ダミーデータをproductとしてdataから取得する。 dataという名前は任意で分かりやすく変えてもらって大丈夫です！
    // 例えばdummydataApiとかHyashidummyDataとかでもいけます。その場合はインポートしているdataの名前も変える必要があります。


    return (
        <div>
            <SearchHeader/>
            <div style={{width: "1200px", justifyContent: "space-between", display: "flex"}}>
                <div style={{"marginTop": "60px", width: "600px"}}>
                    <Sidebar/>
                </div>
                <div >
                </div>
                <SearchResultProducts/>
            </div>



            {product.map((item) => (
                <div key={item._id}>
                    <h1>{item._id}</h1>
                    <h1>{item.productDesc}</h1>
                </div>
            ))}


        </div>
    );
}


export default Page;