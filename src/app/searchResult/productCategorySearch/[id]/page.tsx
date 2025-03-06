"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/_components/header/Header";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Footer from "@/app/_components/footer/Footer";
import { ProductType } from "@/app/utils/product/productDetail";
import ProductCardList from "@/app/_components/CollapsibleProductCard/ProductCardList";
import "../../searchResult.css";
import productCategorySearch from "@/app/utils/search/(product)/productCategorySearch";

const SearchResultParamsId = ({ params }: { params: { id: string } }) => {
    const [searchProductResult, setSearchProductResult] = useState<ProductType[] | undefined>([]);
    const [searchCategory, setSearchCategory] = useState<string>("");
    const [ProductOffset, setProductoffset] = useState(0);
    const ProductPerPage = 4;
    const searchWord = params.id;
    const searchWordDecoded = decodeURI(searchWord);

    // 商品検索の処理
    useEffect(() => {
        const handleProductSearch = async () => {
            const searchTerm = searchCategory || searchWordDecoded; // searchCategoryがある場合、それを使用し、なければsearchWordDecodedを使用
            const response: string | null = await productCategorySearch(searchTerm)
            if (searchCategory == "全件検索"){
                window.location.href  = ("/searchResult")
            }
            if (response !== null) {
                const responseParse = await JSON.parse(response)
                if (responseParse) {
                    setSearchProductResult(responseParse)
                }
            }
        }
        handleProductSearch()
    }, [searchWordDecoded, searchCategory])


    const endOffset = ProductOffset + ProductPerPage;
    const currentProduct = searchProductResult?.slice(ProductOffset, endOffset);
    const pageCount = searchProductResult ? Math.ceil(searchProductResult.length / ProductPerPage) : 0;

    // ページネーションの処理
    const handlePageClick = (e: { selected: number }) => {
        const newOffset = (e.selected * ProductPerPage) % searchProductResult!.length;
        setProductoffset(newOffset);
    };

    // 商品カードリストのコンポーネント
    interface T_itemsProps {
        currentProduct: ProductType[] | undefined;
    }

    const T_items: React.FC<T_itemsProps> = ({ currentProduct }) => {
        return <ProductCardList items={currentProduct} category={searchCategory} size={searchSize} />;
    };

    return (
        <>
            <div>
                <Header />
                <div id="SearchBar">
                    <form id="WordSearch" action="#">
                        <input placeholder="お探しの商品を検索…" type="text" />

                        {/* カテゴリー絞り込み */}
                        <select id="SearchCat" onChange={(e) => setSearchCategory(e.target.value)}>
                            <option value="全件検索">全件検索</option>
                            <option value="トップス">トップス</option>
                            <option value="ボトムス">ボトムス</option>
                            <option value="アウター">アウター</option>
                            <option value="帽子">帽子</option>
                            <option value="靴">靴</option>
                            <option value="アクセサリー">アクセサリー</option>
                            <option value="香水">香水</option>
                        </select>

                        {/* サイズ絞り込み */}
                        {/*<select id="SearchSize" onChange={(e) => setSearchSize(e.target.value)}>*/}
                        {/*    <option value="">サイズ</option>*/}
                        {/*    <option value="XS">XS</option>*/}
                        {/*    <option value="S">S</option>*/}
                        {/*    <option value="M">M</option>*/}
                        {/*    <option value="L">L</option>*/}
                        {/*    <option value="LL">LL</option>*/}
                        {/*    <option value="XL">XL</option>*/}
                        {/*</select>*/}

                        <button id="SearchSubmit" className="searchButton">
                            <Link href={`/searchResult/productSearch/${searchWord}`}>検索</Link>
                        </button>
                    </form>
                </div>

                <div id="NumView">
                    <h2 id="SRTotal">
                        {searchProductResult === undefined
                            ? "0件の検索結果"
                            : searchProductResult.length === 0
                                ? "0件の検索結果"
                                : `${searchProductResult.length}件の検索結果`}
                    </h2>
                    <p id="SRNn">
                        {ProductOffset + 1}件目から{endOffset}件目を表示
                    </p>

                    {/*<div id="ChangeSetting">*/}
                    {/*    <select name="ChangeSort" id="ChangeSort" onChange={(event) => console.log(event.target.value)}>*/}
                    {/*        <option value="新着順">新着順</option>*/}
                    {/*        <option value="人気順">人気順</option>*/}
                    {/*        <option value="値段昇順">値段昇順</option>*/}
                    {/*        <option value="値段降順">値段降順</option>*/}
                    {/*    </select>*/}
                    {/*    <select name="ChangePPP" id="ChangePPP" onChange={(event) => console.log(event.target.value)}>*/}
                    {/*        <option value="2">2</option>*/}
                    {/*        <option value="3">3</option>*/}
                    {/*        <option value="4">4</option>*/}
                    {/*        <option value="5">5</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                </div>

                <div className="productListFrame">
                    <T_items currentProduct={currentProduct} />
                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageClick}
                        breakLabel="..."
                        nextLabel=">"
                        nextLinkClassName="RPnext"
                        previousLabel="<"
                        previousLinkClassName="RPprev"
                        containerClassName="PaginateFlame"
                        pageClassName="PagiClassName"
                        pageLinkClassName="PagiClassLink"
                        activeClassName="activeClassLink"
                        disabledClassName="disable"
                        renderOnZeroPageCount={null}
                    />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default SearchResultParamsId;
