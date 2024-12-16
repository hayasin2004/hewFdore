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
import SearchProduct from "@/app/_components/(search)/searchProduct/Searchproduct";
import Searchuser from "@/app/_components/(search)/userProduct/Searchuser";

export default function Home() {
  return (
    <main>
      <div>
          <SearchProduct/>
          <Searchuser/>
          {/*<Toppage />*/}
          {/*<SearchPageProducts />*/}
          {/*<Toppage />*/}
          <Gmail />
      {/*<Login />*/}
      {/**/}
      </div>
    </main>
  );
}
