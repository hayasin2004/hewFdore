"use client"
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Images from "next/image";
const ToppageTopSlideshow = () => {
    return (
        <>
            <div>

                <Slide slidesToScroll={2} slidesToShow={2} indicators={true}>
                    <div className="each-slide-effect first_slide">
                        <div>
                            <Images className={"slideImage"} src={"/images/Slide/slide_color.png"} width={800}
                                    height={500} alt={"スライドショー"}/>
                        </div>
                    </div>
                    <div className="each-slide-effect second_slide">
                        <div>
                            <Images className={"slideImage"} src={"/images/Slide/slide_perfume.png"} width={800}
                                    height={500} alt={"スライドショー"}/>

                        </div>
                    </div>
                </Slide>
            </div>
        </>
    );
};

export default ToppageTopSlideshow;