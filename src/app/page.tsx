import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
// import Toppage from "./toppage/page";
import { ChakraProvider } from "@chakra-ui/react";

import NewToppage from "@/app/newToppage/page";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
import Header from "@/app/_components/header/Header";
import Gmail from "@/app/_components/InformationGmail/InformationGmail";
import SearchProduct from "@/app/_components/(search)/searchProduct/searchProduct";
import Searchuser from "@/app/_components/(search)/userProduct/Searchuser";
import SearchProductCategory from "@/app/_components/(search)/searchProductCategry/searchProductCategory";
import Toppage from "@/app/toppage/page";
import Blogintroduction from "@/app/_components/blog/Blogintroduction";

export default function Home() {
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
