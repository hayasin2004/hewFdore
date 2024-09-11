import React from 'react';
import "./toppageMain.css"
import Slideshow from "@/app/_components/toppageslideshow/Slideshow";

const ToppageMain = () => {

    return (
        <>
            <div>

                <Slideshow/>


                <hr id="slideshow_line"/>

                <div className="new_Prodct">

                    <h2>
                        New Arrival 新着
                    </h2>
                </div>
            </div>
        </>
    );
}


export default ToppageMain;