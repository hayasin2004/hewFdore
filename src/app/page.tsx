"use client"
import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
// import Toppage from "./toppage/page";

import NewToppage from "@/app/newToppage/page";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
import Header from "@/app/_components/header/Header";
import Gmail from "@/app/_components/InformationGmail/InformationGmail";
import SearchProduct from "@/app/_components/(search)/searchProduct/searchProduct";
import Searchuser from "@/app/_components/(search)/userProduct/Searchuser";
import SearchProductCategory from "@/app/_components/(search)/searchProductCategry/searchProductCategory";
import Toppage from "@/app/toppage/page";
import Blogintroduction from "@/app/_components/blog/Blogintroduction";
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
          <Toppage />
      {/*<Login />*/}
      {/**/}
      </div>
    </main>
  );
}
