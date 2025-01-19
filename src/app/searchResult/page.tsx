"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import "./searchResult.css"
import SearchHeader from "@/app/_components/searchHeader/SearchHeader";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import SearchResultProducts from "@/app/_components/SearchResultProducts/SearchResultProducts";
import {DBProductType} from "@/app/api/product/route";
// ダミーデータ取得
import {products as data} from "../api/dummyData/data"
import {productsProps} from "../api/dummyData/data";
import CompleteStripe from "@/app/_components/stripe/Stripe";
import {loadStripe} from "@stripe/stripe-js";
import Test_PaypayStripe from "@/app/_components/stripe/Test_PaypayStripe";
import Stripe from "@/app/_components/stripe/Stripe";
import CollapsibleProductCard from "@/app/_components/CollapsibleProductCard/CollapsibleProductCard";
// ページネーション
import ReactPaginate from "react-paginate";
import propsToClassKey from "@mui/system/propsToClassKey";
import {
    fillLazyItemsTillLeafWithHead
} from "next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head";
import {color} from "@mui/system";
import {dividerClasses} from "@mui/material";
import ProductCardList from "@/app/_components/CollapsibleProductCard/ProductCardList";



const stripePromise = loadStripe(
    process.env.STRIPE_SECRET_KEY!
)

const SearchPageProducts = () => {
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

            const query = new URLSearchParams(window.location.search)
            if (query.get("success")){
                console.log("登録されたメールアドレスに支払い情報が送られました。")
            }
            if (query.get("canceled")){
                console.log("お支払いがうまく行えませんでいた、再度入力内容をお確かめの上お支払いを行って下さい")
            }


        }
        CallProductList()
    }, []);


    //
    // // 商品を展開
    // const product : DBProductType[]   = productList.map((item) => {
    //     return {...item ,id : item._id}
    //     }
    // )
    var page = 0;
    const product  = productList.map((item) => {
        return {...item,id:item._id}
    })
    // HTMLでmap関数で展開するためにこの書き方してます。
//     ...item　→　スプレッド構文です。オブジェクトの中身を上から取り出します。mapは配列ですが、
//     ...itemはオブジェクト型を取り出すのに特化したものと考えてもいいかもです。
//     一意に商品を識別したいのでMongoDBでいうobjectIDを _idとして呼び出しています。
//     つまりitemで各要素を取り出して、取り出した要素からitem._idとして取り出しproductにidとして渡しています。
//     このidがHTML内で使われているmap関数のkey={item.id}になります。

    // t_itemsをProductListに置き換えてhtml分をCollapsible~にやればいけるはず
    const t_item = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    function T_items({currentProduct}){
        return(
            <>
                {currentProduct.map((item) => (

                    <CollapsibleProductCard key={item._id} item={item} />

                    // <div className={"productList_"} key={item._id} style={{textAlign: "center"}}>
                    //     {/*<p>商品番号 : {item._id}</p>*/}
                    //     {/*<p>ユーザーネーム : {item.userId}</p>*/}
                    //     <p className={"listImage"}>item.いめーじ</p>
                    //     <p className={"productExplanation"}>商品説明 : {item.productDesc}</p>
                    //     <p className={"productExplanation"}>出品者名 : {item.productName}</p>
                    //     <p className={"productPrice"}>商品価格 : {Number(item.productPrice).toLocaleString()}円</p>
                    //     {/*<Stripe productId={item?._id} />*/}
                    // </div>
                ))}
            </>
        )
    }
    const ProductPerPage = 4;
    const [ProductOffset, setProductoffset] = useState(0);
    const endOffset = ProductOffset + ProductPerPage;
    const currentProduct = productList.slice(ProductOffset, ProductOffset + ProductPerPage);
    const pageCount = Math.ceil(t_item.length / ProductPerPage);
    const handlePageClick = (e: { selected: number }) => {
        const newOfffset = (e.selected * ProductPerPage) % productList.length;
        setProductoffset(newOfffset);

    };

    // 練習コーナー2
    // ProductListを基に表示する分のデータを切り出す
    // sliceだとA以上B未満になる
    var sliceProduct = productList.slice(0,10)
    console.log(sliceProduct);
    function pageChange(page:  number ){
        var pMax = 10 * (page+1)-1;
        var pMin = page *10;
         const filterProduct = productList.filter((productList,index) => {
             if(index <= pMax){
                 return index >= pMin
             }
         })
        console.log(page,filterProduct);
    }


    // react-paginate公式Usage参考 なんかProduct数が2つになってるんですけど！？

    return (
        <div>
            {/*<SearchHeader/>*/}
            <div style={{width: "1200px", justifyContent: "space-between", display: "flex"}}>
                <div style={{"marginTop": "60px", width: "600px"}}>
                    {/*<Sidebar/>*/}
                </div>
                <div >
                </div>
                <SearchResultProducts/>
            </div>
        <div>
        </div>

            {/* 取り出せる内容はコンソールに表示してます。*/}
            <div className={"productListFrame"}>
                <T_items currentProduct={currentProduct}/>
                <ReactPaginate pageCount={pageCount}
                               marginPagesDisplayed={0}
                               pageRangeDisplayed={2}
                               onPageChange={handlePageClick}
                               breakLabel={"..."}
                               nextLabel={">"}
                               nextLinkClassName="RPnext"
                               previousLabel={"<"}
                               previousClassName="RPprev"
                               containerClassName="PaginateFlame"
                               pageClassName="PagiClassName"
                               pageLinkClassName="PagiClassLink"
                               activeClassName="activeClassLink"
                               disabledClassName="disable"
                               renderOnZeroPageCount={null}
                               />

                <div className={"filterTest"}>
                    {/*{sliceProduct.map((item)=>(*/}
                    {/*    // eslint-disable-next-line react/jsx-key*/}
                    {/*    <div>{item._id}</div>*/}
                    {/*))}*/}
                    {/*{t_item.slice()}*/}


                </div>

                <SearchResultProducts/>

                <ProductCardList items={product} />
            </div>



        </div>
    );
}


export default SearchPageProducts;