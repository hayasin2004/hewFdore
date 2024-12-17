"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import productSearch from "@/app/utils/search/(product)/productSearch";

const SearchResultParamsId = ({params}: { params: { id: string } }) => {　
    const [searchProductResult, setSearchProductResult] = useState<string[] | null>(null)
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
    }, [])
    return (
        <>
            <h3>{searchWordDecoded}の検索結果</h3>
            {searchProductResult?.map((item) => (
                <ul key={item._id}>
                    <li>
                        商品名 : {item.productName}
                    </li>
                </ul>
            ))}
        </>
    );
}


export default SearchResultParamsId;