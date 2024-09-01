"use client"
import React from 'react';
import Header from "@/app/_components/header/Header";
import Sidebar from "@/app/_components/sidebar/Sidebar";
import ToppageMain from "@/app/_components/toppageMain/ToppageMain";
import {createUser} from "@/lib/mongodb";

const Toppage = () => {
    const  handleaaaa = () => {
        createUser()
        console.log(createUser());
    }
    return (
        <div>
            <Header/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Sidebar/>
                <ToppageMain/>
                <button onClick={handleaaaa}>adfadfasdfasfasdf</button>
            </div>
        </div>
    );
}


export default Toppage;
