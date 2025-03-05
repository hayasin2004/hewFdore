"use client"
import React, {ChangeEvent, useEffect, useState} from 'react';
import "./searchResult.css"
// コンポーネント読み込み
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
// ダミーデータ取得
import ProductCardList, {ProductCardListProps} from "@/app/_components/CollapsibleProductCard/ProductCardList";
// ページネーション
import ReactPaginate from "react-paginate";
import {ProductType} from "@/app/utils/product/productDetail";


const SearchPageProducts = () => {

    const [productList, setProductList] = useState<ProductType[]>([])
    const [categoryProductList, setCategoryProductList] = useState<ProductType[]>([])
    const [productListLength, setProductListLength] = useState<number>(0)
    console.log(productList.length)
    const [searchCategory, setSearchCategory] = useState<string>("")
    const [searchSize, setSearchSize] = useState<string>("")
    const [searchWord, setSearchWord] = useState<string>("")
    console.log(searchCategory)
    // console.log(JSON.stringify(productList) + "取得")


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
                    const productData: ProductType[] = await items.json()

                    console.log(productData)
                    //    取得してきたitemsをproductDataとしてsetProductListに代入。後はmap関数で一個一個取り出せばおっけーい
                    setProductList(productData)
                    setProductListLength(productData.length)

                    console.log("success")
                } catch (err) {
                    console.log("Error" + err)

                }
            })
            // console.log(JSON.stringify(productData))

            const query = new URLSearchParams(window.location.search)
            if (query.get("success")) {
                console.log("登録されたメールアドレスに支払い情報が送られました。")
            }
            if (query.get("canceled")) {
                console.log("お支払いがうまく行えませんでいた、再度入力内容をお確かめの上お支払いを行って下さい")
            }


        }
        CallProductList()
    }, []);


    //
    // // 商品を展開
    const product: ProductType[] = productList;
    // HTMLでmap関数で展開するためにこの書き方してます。
//     ...item　→　スプレッド構文です。オブジェクトの中身を上から取り出します。mapは配列ですが、
//     ...itemはオブジェクト型を取り出すのに特化したものと考えてもいいかもです。
//     一意に商品を識別したいのでMongoDBでいうobjectIDを _idとして呼び出しています。
//     つまりitemで各要素を取り出して、取り出した要素からitem._idとして取り出しproductにidとして渡しています。
//     このidがHTML内で使われているmap関数のkey={item.id}になります。

    // t_itemsをProductListに置き換えてhtml分をCollapsible~にやればいけるはず

    function T_items({category,currentProduct, categoryProductList} : ProductCardListProps) {
        console.log("category" + category,"currentProduct" + currentProduct, "categoryProductList"+ categoryProductList)
        return (
            // ここで表示html設定
            <>
                {/*<div style={{"margin":50,"color":"red"}}> {currentProduct}</div>*/}
                {
                    category == ""  ?
                        <>
                            <ProductCardList items={currentProduct} category={searchCategory} size={searchSize}/>
                        </>
                        :
                        <>
                            <ProductCardList items={categoryProductList} category={searchCategory} size={searchSize}/>
                        </>

                }
            </>
        )
    }

    // 1ページごとに表示する数はProductPerPageで変えられます
    const ProductPerPage = 4;
    const [ProductOffset, setProductoffset] = useState(0);
    const endOffset = ProductOffset + ProductPerPage;
    const currentProduct = productList.slice(ProductOffset, endOffset);
    const categoryProductListData = categoryProductList.slice(ProductOffset, endOffset);
    const pageCount = product.length / ProductPerPage;
    const handlePageClick = (e: { selected: number }) => {
        const newOfffset = (e.selected * ProductPerPage) % product.length;
        setProductoffset(newOfffset);

    };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
        console.log(e.target.value)
    }

    const filterProductByCategory = (items: ProductType[], category: string) => {
        console.log("ここまで来た" + items.length)
        return items.filter(product => product?.productCategory?.includes(category));
    }
    useEffect(() => {
        const searchCategoryResult = filterProductByCategory(productList, searchCategory)
        console.log(searchCategoryResult)
        setCategoryProductList(searchCategoryResult)
        setProductListLength(searchCategoryResult.length)
    }, [productList ,searchCategory]);


    return (
        <div>
            <Header/>
            <div id={"SearchBar"}>
                {/* このdivに検索バー、オプションを入れる */}
                <form id={"WordSearch"} action="#">
                    {/*　文字入力　*/}
                    <input onChange={(e) => {
                        handleCategoryChange(e)
                    }} placeholder="お探しの商品を検索…" type="text"/>
                    {/*　カテゴリ絞り込み　*/}
                    {/*<input id={"CatSearch"} list={"SearchCat"}/>*/}
                    <select id={"SearchCatSearchCat"} onChange={(e) => {
                        setSearchCategory(e.target.value)
                    }}>
                        <option value="">カテゴリー</option>
                        <option value="トップス">トップス</option>
                        <option value="ボトム">ボトム</option>
                        <option value="アウター">アウター
                        </option>
                        <option value="帽子">帽子</option>
                        <option value="靴">靴</option>
                        <option value="アクセサリー">アクセサリー</option>
                        <option value="香水">香水</option>
                    </select>
                    {/*　サイズ絞り込み　*/}
                    {/*<select id={"SearchSize"} onChange={(e) => {*/}
                    {/*    setSearchSize(e.target.value)*/}
                    {/*}}>*/}
                    {/*    <option value="">サイズ</option>*/}
                    {/*    <option value="XS">XS</option>*/}
                    {/*    <option value="S">S</option>*/}
                    {/*    <option value="M">M</option>*/}
                    {/*    <option value="L">L</option>*/}
                    {/*    <option value="LL">LL</option>*/}
                    {/*    <option value="XL">XL</option>*/}
                    {/*</select>*/}
                    <button id={"SearchSubmit"} type={"submit"} >
                        <a href={`/searchResult/productSearch/${searchWord}`} target={"_blank"}>
                            検索
                        </a>
                    </button>
                </form>
            </div>

            <div id={"NumView"}>
                <h2 id={"SRTotal"}>{searchCategory == ""  ?productList.length : productListLength}件の検索結果</h2>
                <p id={"SRNn"}>{ProductOffset + 1}件目から{endOffset}件目を表示</p>


            </div>

            {/* 取り出せる内容はコンソールに表示してます。*/}
            <div className={"productListFrame"}>
                {/*<ProductCardList items={product} />*/}
                <T_items category={searchCategory} currentProduct={currentProduct} categoryProductList={categoryProductListData}/>
                <ReactPaginate pageCount={pageCount}
                               pageRangeDisplayed={2}
                               marginPagesDisplayed={1}
                               onPageChange={handlePageClick}
                               breakLabel={"..."}
                               nextLabel={">"}
                               nextLinkClassName="RPnext"
                               previousLabel={"<"}
                               previousLinkClassName="RPprev"
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
                {/*{product.map((item) => (*/}

                {/*    <CollapsibleProductCard key={item._id} item={item} />*/}

                {/*    // <div className={"productList_"} key={item._id} style={{textAlign: "center"}}>*/}
                {/*    //     /!*<p>商品番号 : {item._id}</p>*!/*/}
                {/*    //     /!*<p>ユーザーネーム : {item.userId}</p>*!/*/}
                {/*    //     <p className={"listImage"}>item.いめーじ</p>*/}
                {/*    //     <p className={"productExplanation"}>商品説明 : {item.productDesc}</p>*/}
                {/*    //     <p className={"productExplanation"}>出品者名 : {item.productName}</p>*/}
                {/*    //     <p className={"productPrice"}>商品価格 : {Number(item.productPrice).toLocaleString()}円</p>*/}
                {/*    //     /!*<Stripe productId={item?._id} />*!/*/}
                {/*    // </div>*/}
                {/*))}*/}
                {/*<SearchResultProducts/>*/}

            </div>

            <Footer/>

        </div>
    );
}


export default SearchPageProducts;