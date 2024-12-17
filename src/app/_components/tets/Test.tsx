"use client"
import React from 'react';
import InsertProductCategoryLikeList from "@/app/utils/setting/update/InserteProductCategoryLikeList";
import addUserProductCategoryToMail from "@/app/utils/search/(product)/AddUserProductCategoryToMail";

const TestCom = () => {
    const testClick = async () => {
        // InsertProductCategoryLikeList()
        addUserProductCategoryToMail()
    }
    return (
        <div>
            <button onClick={testClick}>ユーザー挿入</button>
        </div>
    );
}


export default TestCom;