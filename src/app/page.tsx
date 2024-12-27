"use client"
import Header from "@/app/_components/header/Header";
import Gmail from "@/app/_components/InformationGmail/InformationGmail";
import SearchProduct from "@/app/_components/(search)/searchProduct/searchProduct";
import Searchuser from "@/app/_components/(search)/userProduct/Searchuser";
import SearchProductCategory from "@/app/_components/(search)/searchProductCategry/searchProductCategory";
import Toppage from "@/app/toppage/page";
import {useEffect} from "react";
import ChatMessageLike from "@/app/utils/setting/update/buyerChatMessageLike";


export default function Home() {
    useEffect(() => {
        ChatMessageLike()
    }, []);
    // const props : string = "UserId"
    // DeleteProductCategoryLikeListField()
    return (
        <main>
            <div>
                <Header/>
                <p>これは商品</p>
                <SearchProduct/>
                <p>これはカテゴリー</p>
                <SearchProductCategory/>
                <p>これはユーザー</p>
                <Searchuser/>
                {/*<Toppage />*/}
                {/*<SearchPageProducts />*/}
                {/*<Toppage />*/}
                <Gmail/>
                {/*<Login />*/}
                {/**/}
            </div>
        </main>
    );
}
