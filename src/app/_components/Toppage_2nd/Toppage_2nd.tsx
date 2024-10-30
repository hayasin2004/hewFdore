"use client"
import React, {useState} from 'react';
import "./common.css"

// react-slideshow-image使う場合
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

// Swiperの名残　正直Swiperの方がテキストの充実という意味では使いやすいかも
// import {Swiper,SwiperSlide} from "swiper/react";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import {Navigation} from "swiper/modules";

// import Product from "@/app/product/page";
// import Image from "next/image"
// import Link from "next/link";



const Toppage_2nd = () => {
    const images = [
        '../images/Slide/slide_color.png',
        '../images/Slide/slide_color.png',
        '../images/Slide/slide_color.png',
    ];
    return (
        <>
            <div className={"inner"}>
                <Slide　slidesToShow={3} slidesToScroll={1} indicators={true}>
                    <div className={"each-slide-effect"}>
                        <div className={"boxes"} style={{'backgroundImage': `url(${images[0]})`}}>
                            <span>Slide 1</span>
                        </div>
                    </div>
                    <div className={"each-slide-effect"}>
                        <div className={"boxes"} style={{'backgroundImage': `url(${images[1]})`}}>
                            <span>Slide 2</span>
                        </div>
                    </div>

                    <div className={"each-slide-effect"}>
                        <div className={"boxes"} style={{'backgroundImage': `url(${images[2]})`}}>
                            <span>Slide 3</span>
                        </div>
                    </div>
                </Slide>
            </div>

        </>
    );
};

export default Toppage_2nd;