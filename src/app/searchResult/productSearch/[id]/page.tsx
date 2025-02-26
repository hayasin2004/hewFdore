"use client"
import React, {useEffect, useState} from 'react';
import productSearch from "@/app/utils/search/(product)/productSearch";
import Header from "@/app/_components/header/Header";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Footer from "@/app/_components/footer/Footer";
import {ProductType} from "@/app/utils/product/productDetail";
import ProductCardList from "@/app/_components/CollapsibleProductCard/ProductCardList";
import "../../searchResult.css"

const SearchResultParamsId = ({params}: { params: { id: string } }) => {
    const [searchProductResult, setSearchProductResult] = useState<ProductType[] | undefined>([])
    console.log(searchProductResult)
    useEffect(() => {

        const query = new URLSearchParams(window.location.search);
        const category = query.get("category")
        console.log(category)
    }, []);
    const searchWord = params.id;
    const searchWordDecoded = decodeURI(searchWord);
    useEffect(() => {
        const handleProductSearch = async () => {
            const response: string | null = await productSearch(searchWordDecoded)
            if (response !== null) {
                const responseParse = await JSON.parse(response)
                console.log(responseParse)
                if (responseParse) {
                    setSearchProductResult(responseParse)
                }
            }
            console.log(response)
        }
        handleProductSearch()
    }, [searchWordDecoded])

    // 検索結果ネーション
    const ProductPerPage = 4;
    const [ProductOffset, setProductoffset] = useState(0);
    const [searchSize, setSearchSize] = useState<string>("")
    const [searchCategory, setSearchCategory] = useState<string>("")
    const [categoryProductList, setCategoryProductList] = useState<ProductType[]>([])
    const endOffset = ProductOffset + ProductPerPage;
    const currentProduct = searchProductResult?.slice(ProductOffset, endOffset);
    const categoryProductListData = categoryProductList.slice(ProductOffset, endOffset);
    const pageCount = searchProductResult!.length / ProductPerPage;
    const handlePageClick = (e: { selected: number }) => {
        const newOfffset = (e.selected * ProductPerPage) % searchProductResult!.length;
        setProductoffset(newOfffset);
    };

    useEffect(() => {
        setSearchCategory("")
        setCategoryProductList([])
    }, []);

    interface T_itemsProps {
        category: string;
        currentProduct: ProductType[] | undefined;
        categoryProductList: ProductType[];
    }

    const T_items: React.FC<T_itemsProps> = ({category, currentProduct, categoryProductList}) => {

        console.log(categoryProductList)
        return (
            <>
                {
                    category == "" ?
                        <>
                            <ProductCardList items={currentProduct} category={searchCategory} size={searchSize}/>
                        </>
                        :
                        <>
                            <ProductCardList items={currentProduct} category={searchCategory} size={searchSize}/>
                        </>

                }
            </>
        );

    }


    return (
        <>
            <div>
                <Header/>
                <div id={"SearchBar"}>
                    {/* このdivに検索バー、オプションを入れる */}
                    <form id={"WordSearch"} action="#">
                        {/*　文字入力　*/}
                        <input placeholder="お探しの商品を検索…" type="text"/>
                        {/*　カテゴリ絞り込み　*/}
                        {/*<input id={"CatSearch"} list={"SearchCat"}/>*/}
                        <select id={"SearchCat"}>
                            <option value=" ">カテゴリー</option>
                            <option value="トップス">トップス</option>
                            <option value="ボトムス">ボトムス</option>
                            <option value="アウター">アウター</option>
                            <option value="帽子">帽子</option>
                            <option value="靴">靴</option>
                            <option value="アクセサリー">アクセサリー</option>
                            <option value="香水">香水</option>
                        </select>
                        {/*　サイズ絞り込み　*/}
                        <select id={"SearchSize"} onChange={(e) => {
                            setSearchSize(e.target.value)
                        }}>
                            <option value="">サイズ</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="LL">LL</option>
                            <option value="XL">XL</option>
                        </select>
                        <button id={"SearchSubmit"} className={"searchButton"}>
                            <Link href={`/searchResult/productSearch/${searchWord}`}>
                                検索
                            </Link>
                        </button>
                    </form>
                </div>

                <div id={"NumView"}>
                    <h2 id={"SRTotal"}>{searchProductResult == undefined ? searchProductResult?._id : searchProductResult?.length}件の検索結果</h2>
                    <p id={"SRNn"}>{ProductOffset + 1}件目から{endOffset}件目を表示</p>
                    <div id={"ChangeSetting"}>
                        {/*<p>ここに並び替えとProductPerPage変更を置く</p>*/}
                        <select name="ChangeSort" id="ChangeSort" onChange={(event) => console.log(event.target.value)}>
                            <option value="新着順">新着順</option>
                            <option value="人気順">人気順</option>
                            <option value="値段昇順">値段昇順</option>
                            <option value="値段降順">値段降順</option>
                        </select>
                        <select name="ChangePPP" id="ChangePPP" onChange={(event) => console.log(event.target.value)}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                </div>

                {/* 取り出せる内容はコンソールに表示してます。*/}
                <div className={"productListFrame"}>
                    {/*<ProductCardList items={product} />*/}
                    <T_items category={searchCategory} currentProduct={currentProduct}
                             categoryProductList={categoryProductListData}/>
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

                </div>

                <Footer/>

            </div>

        </>
    );
}


export default SearchResultParamsId;