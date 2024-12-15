"use client"
import React, {useEffect, useState} from 'react';
import productSearch from "@/app/utils/search/productSearch";
import {ProductType} from "@/app/utils/product/productDetail";
import {useRouter} from "next/navigation";

const Searchuser = () => {
    const router = useRouter();
    const [searchKeyWord, setSearchKeyWord] = useState<string | null>("")

    const handleProductSearch = async () => {
        router.push(`/searchResult/userSearch/${searchKeyWord}`)

    }
    console.log(searchKeyWord)
    return (
        <>
            <label htmlFor="searchKeyWord">
                <input type="text" onChange={(e) => setSearchKeyWord(e.target.value)} value={searchKeyWord}/>
                <button type={"submit"} onClick={handleProductSearch}>検索</button>
            </label>
            {/*{searchProductResult?.map((item) => (*/}
            {/*    <ul key={item._id}>*/}
            {/*        <li>*/}
            {/*            商品名 : {item.productName}*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*))}*/}
        </>
    );
};

export default Searchuser;