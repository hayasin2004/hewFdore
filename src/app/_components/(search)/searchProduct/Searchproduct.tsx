"use client"
import React, {useEffect, useState} from 'react';
import productSearch from "@/app/utils/search/productSearch";



const SearchProduct = () => {
    const [searchKeyWord, setSearchKeyWord] = useState<string>("")

    const handleProductSearch = async () => {
        const response = await  productSearch(searchKeyWord)
        setSearchKeyWord("")
        console.log(searchKeyWord)
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