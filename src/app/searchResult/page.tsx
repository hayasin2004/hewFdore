import React from 'react';
import Header from "@/app/_components/header/Header";
import SearchHeader from "@/app/_components/searchHeader/SearchHeader";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import SearchResultProducts from "@/app/_components/SearchResultProducts/SearchResultProducts";

// ダミーデータ取得
import {products as data}  from "../api/dummyData/data"
import {productsProps} from "../api/dummyData/data";


const Page = () => {
    // ダミーデータをproductとしてdataから取得する。 dataという名前は任意で分かりやすく変えてもらって大丈夫です！
    // 例えばdummydataApiとかHyashidummyDataとかでもいけます。その場合はインポートしているdataの名前も変える必要があります。
    const products : productsProps[] = data
    console.log(products)
    return (
        <div>
            <SearchHeader/>
            <div style={{width: "1200px", justifyContent: "space-between", display: "flex"}}>
                <div style={{"marginTop": "60px" , width: "600px"}}>
                    <Sidebar/>
                </div>
                {/*ダミーデータをプロップスで渡している。*/}
                <SearchResultProducts product={products} 　 />
            </div>
        </div>
    );
}


export default Page;