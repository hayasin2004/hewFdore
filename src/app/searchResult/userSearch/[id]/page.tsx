"use client"
import React, {useEffect, useState} from 'react';
import userSearch from "@/app/utils/search/(user)/userSearch";

const SearchResultParamsId = ({params}: { params: { id: string } }) => {
    const [searchUserResult, setSearchUserResult] = useState<string[] | null>(null)
    const searchWord = params.id;
    const searchWordDecoded = decodeURI(searchWord);
    useEffect(() => {
        const handleProductSearch = async () => {
            const response: string | null = await userSearch(searchWordDecoded)
            if (response !== null) {
                const responseParse = await JSON.parse(response)
                if (responseParse) {
                    setSearchUserResult(responseParse)
                }
            }
            console.log(response)
        }
        handleProductSearch()
    }, [])
    return (
        <>
            <h3>{searchWordDecoded}の検索結果</h3>
            {searchUserResult?.map((item) => (
                <ul key={item._id}>
                    <li>
                        商品名 : {item.email}
                    </li>
                </ul>
            ))}
        </>
    );
}


export default SearchResultParamsId;