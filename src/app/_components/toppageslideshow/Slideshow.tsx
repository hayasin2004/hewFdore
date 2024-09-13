import React from 'react';
import "./slideshow.css"
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Box from "@mui/material/Box";
import Images from "next/image";


const Slideshow = () => {


    return (
        <>
            <Box className={"top_main"}>

                <Box className={"slideshow"}>

                    <Slide slidesToShow={1} duration={1500} infinite={true} indicators={true} arrows={false}>
                        <div className="each-slide-effect">
                            <div>
                                <Images className={"slideImage"} src={"/images/Slide/slide_color.png"} width={800} height={500} alt={"スライドショー"} />
                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div>
                                <Images className={"slideImage"} src={"/images/Slide/slide_perfume.png"} width={800} height={500} alt={"スライドショー"} />

                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div>
                                <Images className={"slideImage"} src={"/images/Slide/slide_vintage.png"} width={800} height={500} alt={"スライドショー"} />
                            </div>
                        </div>
                    </Slide>
                </Box>

            </Box>
        </>
    );
}


export default Slideshow;