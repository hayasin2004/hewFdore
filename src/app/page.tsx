import Register from "@/app/(auth)/register/page";
import Login from "@/app/(auth)/login/page";
import Toppage from "./toppage/page";
import { ChakraProvider } from "@chakra-ui/react";
export default function Home() {
  return (
    <main >
      <div>
          {/*<Toppage />*/}
          <Register/>
      {/*<Login />*/}
      {/**/}
      </div>
    </main>
  );
}
