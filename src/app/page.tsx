import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
import Toppage from "./toppage/page";
import { ChakraProvider } from "@chakra-ui/react";

import NewToppage from "@/app/newToppage/page";
import ToppageTopSlideshow from "@/app/_components/toppageTopSlideshow/ToppageTopSlideshow";
import Toppage_top_slideshow from "@/app/_components/toppage_top_slideshow/Toppage_top_slideshow";
export default function Home() {
  return (
    <main >
      <div>
          {/*<Toppage />*/}
          <Toppage_top_slideshow/>
      {/*<Login />*/}
      {/**/}
      </div>
    </main>
  );
}
