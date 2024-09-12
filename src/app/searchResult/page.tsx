import React from 'react';
import Header from "@/app/_components/header/Header";
import SearchHeader from "@/app/_components/searchHeader/SearchHeader";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import SearchResultProducts from "@/app/_components/SearchResultProducts/SearchResultProducts";
import Footer from "@/app/_components/footer/Footer";
const Page = () => {

    return (
        <div>
            <SearchHeader/>
            <div style={{width: "1200px", justifyContent: "space-between", display: "flex"}}>
                <div style={{"marginTop": "60px" , width: "600px"}}>
                    <Sidebar/>
                </div>
                <SearchResultProducts/>
            </div>
            <Footer/>
        </div>


    );
}


export default Page;