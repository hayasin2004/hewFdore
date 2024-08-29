import Image from "next/image";
import styles from "./page.module.css";
import Sample from "@/app/_components/sample/Sample"
import Aaa from "@/app/pages/toppage/page";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import Login from "@/app/pages/login/page";

export default function Home() {
  return (
    <main >
      <div>
      <Login />
      </div>
    </main>
  );
}
