
import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
// import Toppage from "./toppage/page";

import NewToppage from "@/app/newToppage/page";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
import Header from "@/app/_components/header/Header";
import ToppageSite3 from "@/app/_components/toppage_site3/Toppage_site3";
import Toppage_2nd from "@/app/_components/Toppage_2nd/Toppage_2nd";
import Toppage from "@/app/toppage/page";
import Gmail from "./_components/gmail/Gmail";
import SearchPageProducts from "@/app/searchResult/page";
import SearchProduct from "@/app/_components/(search)/searchProduct/searchProduct";
import Searchuser from "@/app/_components/(search)/userProduct/Searchuser";
import UpdateProductLikeList from "@/app/utils/setting/update/UpdateProductLikeList";
import addUserProductCategoryToMail from "@/app/utils/search/(product)/AddUserProductCategoryToMail";
import UpdateProductCategoryLikeList from "@/app/utils/setting/update/InserteProductCategoryLikeList";
import InsertProductCategoryLikeList from "@/app/utils/setting/update/InserteProductCategoryLikeList";
import DeleteProductCategoryLikeList from "@/app/utils/setting/update/DeleteProductCategoryLikeList";
import DeleteProductCategoryLikeListField from "@/app/utils/setting/update/UpdateProductCategoryLikeList";
import TestCom from "@/app/_components/tets/Test";
import SearchProductCategory from "@/app/_components/(search)/searchProductCategry/searchProductCategory";
import {useEffect} from "react";

export default function Home() {

    // const props : string = "UserId"
    // DeleteProductCategoryLikeListField()
    return (
        <main>
            <div>
                <Header/>
                <TestCom/>
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
