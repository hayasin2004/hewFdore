"use client"
import React from 'react';
import InsertProductCategoryLikeList from "@/app/utils/setting/update/InserteProductCategoryLikeList";
import productCategorySearch from "@/app/utils/search/(product)/productCategorySearch";

const TestCom = () => {
    const testClick = async () => {
        // InsertProductCategoryLikeList()
        productCategorySearch()
    }
    return (
        <div>
            <button onClick={testClick}>ユーザー挿入</button>
        </div>
    );
}


export default TestCom;