"use client"
import React, {useState} from 'react';
import "./common.css"

// react-slideshow-image使う場合
// import {Slide} from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'

// Swiperの名残　正直Swiperの方がテキストの充実という意味では使いやすいかも

import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {Scrollbar} from "swiper/modules";

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
                <Swiper
                    modules={[Scrollbar,]}
                    spaceBetween={50}
                    slidesPerView={2}
                    scrollbar={{draggable:true}}
                >
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[0]})`}}><p>slide1</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[1]})`}}><p>slide2</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[2]})`}}><p>slide3</p></div></SwiperSlide>

                </Swiper>




            </div>

        </>
    );
};

export default Toppage_2nd;