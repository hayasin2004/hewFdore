import React from 'react';
import "./slideshow.css"
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Box from "@mui/material/Box";


const Slideshow = () => {
    const images = [
        "images/slide/slide_perfume.png",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];

    return (
        <>
            <Box className={"top_main"}>

                <Box className={"slideshow"}>

                    <Slide slidesToShow={1} duration={2000} infinite={true} indicators={true} arrows={false}>
                        <div className="each-slide-effect">
                            <div style={{'backgroundImage': `url(${images[0]})`}}>
                                <span>Slide 1</span>
                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div style={{'backgroundImage': `url(${images[1]})`}}>
                                <span>Slide 2</span>
                            </div>
                        </div>
                        <div className="each-slide-effect">
                            <div style={{'backgroundImage': `url(${images[2]})`}}>
                                <span>Slide 3</span>
                            </div>
                        </div>
                    </Slide>
                </Box>

            </Box>
        </>
    );
}


export default Slideshow;