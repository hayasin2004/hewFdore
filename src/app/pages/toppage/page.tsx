import React from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";

const Toppage = () => {

    return (
        <div>
            <Header/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Sidebar/>
                <ToppageMain/>
            </div>
        </div>
    );
}


export default Toppage;
