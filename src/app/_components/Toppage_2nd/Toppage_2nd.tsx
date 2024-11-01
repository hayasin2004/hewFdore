"use client"
import React, {useState} from 'react';
import "./common.css"


import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import {Autoplay,Scrollbar,Pagination} from "swiper/modules";

// import Product from "@/app/product/page";
// import Image from "next/image"
// import Link from "next/link";

// Active判定で違うIDの値を返す


const Toppage_2nd = () => {
    // スライドの中身の辞書
    const Slide2dex = [
        {img:'../images/Slide/slide_color.png',
        tit:'first'},
        {img:'../images/Slide/slide_color.png',
            tit:'2nd'},
        {img:'../images/Slide/slide_color.png',
            tit:'third'},
    ];

    return (
        <>
            <div className={"inner"}>
                <Swiper
                    modules={[Autoplay,Scrollbar,Pagination]}
                    spaceBetween={50}
                    slidesPerView={3}
                    centeredSlides={true}
                    autoplay={true}
                    loop={true}
                    followFinger={false}
                    scrollbar={{draggable:true}}
                    pagination={{el:".swiper-pagination", clickable:true}}
                >
                    <SwiperSlide>
                        {({isActive}) => (<div>Current slide is ?</div>)}
                    </SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[0].img})`}}><p className={"s2tit"}>{Slide2dex[0].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[1].img})`}}><p className={"s2tit"}>{Slide2dex[1].tit}</p></div></SwiperSlide>
                    {/*<SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[2]})`}}><p className={"s2tit"}>slide3</p></div></SwiperSlide>*/}
                    {/*<SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[2]})`}}><p className={"s2tit"}>slide4</p></div></SwiperSlide>*/}
                    {/*<SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[2]})`}}><p className={"s2tit"}>slide5</p></div></SwiperSlide>*/}
                    {/*<SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${images[2]})`}}><p className={"s2tit"}>slide6</p></div></SwiperSlide>*/}

                </Swiper>




            </div>

        </>
    );
};

export default Toppage_2nd;