import React from 'react';
import "./toppageMain.css"
import Slideshow from "@/app/_components/toppageslideshow/Slideshow";
import ToppageProducts from "@/app/_components/toppageProduct/ToppageProducts";

const ToppageMain = () => {

    return (
        <>
            <div style={{display:"block"}}>

            <div className="toppageMain">

                <Slideshow/>


                <hr id="slideshow_line"/>



            </div>

            </div>
        </>
    );
}


export default ToppageMain;