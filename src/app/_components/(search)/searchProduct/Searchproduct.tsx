"use client"
import React, {useEffect, useState} from 'react';
import productSearch from "@/app/utils/search/productSearch";
import {ProductType} from "@/app/utils/product/productDetail";



const SearchProduct = () => {
    const [searchKeyWord, setSearchKeyWord] = useState<string | null>("")
    const [searchProductResult, setSearchProductResult] = useState<string[] | null>([])

    const handleProductSearch = async () => {
        const response = await  productSearch(searchKeyWord)
        setSearchProductResult(response);
        setSearchKeyWord("")
        console.log(response)
    }

    console.log(searchKeyWord)
    return (
        <>
            <label htmlFor="searchKeyWord">
                <input type="text" onChange={(e) => setSearchKeyWord(e.target.value)} value={searchKeyWord}/>
                <button type={"submit"} onClick={handleProductSearch}>検索</button>
            </label>
        </>
    );
};

export default SearchProduct;