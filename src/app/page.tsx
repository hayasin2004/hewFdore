import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
// import Toppage from "./toppage/page";
import { ChakraProvider } from "@chakra-ui/react";

import NewToppage from "@/app/newToppage/page";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
import Header from "@/app/_components/header/Header";
import Toppage from "@/app/toppage/page";
import Stripe from "@/app/_components/stripe/Stripe";
import PaidNote from "@/app/paidNote/page";
import SearchResultProducts from "@/app/_components/SearchResultProducts/SearchResultProducts";
import SearchPageProducts from "@/app/searchResult/page";
export default function Home() {
  return (
    <main>
      <div>
          <SearchPageProducts />
          {/*<Toppage />*/}
      {/*<Login />*/}
      {/**/}
      </div>
    </main>
  );
}
