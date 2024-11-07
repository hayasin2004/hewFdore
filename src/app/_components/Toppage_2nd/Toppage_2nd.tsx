"use client"
import React, {useState} from 'react';
import "./common.css"


import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {Autoplay,Scrollbar,Pagination,EffectCoverflow} from "swiper/modules";
import {rotate} from "next/dist/server/lib/squoosh/impl";

// import Product from "@/app/product/page";
// import Image from "next/image"
// import Link from "next/link";

// Active判定で違うIDの値を返す
// function CKact({num,isAct}){
//     if(isAct) {
//         // return <div className={"boxes"} style={{'backgroundImage': `url(${{dex}[{num}].img})`}}>
//         <p className={"s2tit"}>{num}</p>
//     // </div>
//     }
//     return <p> False{num}</p>;
// }

const Toppage_2nd = () => {
    // スライドの中身の辞書
    const Slide2dex = [
        {
            img: '../images/Slide/slide_color.png',
        tit:'1st'},
        {img:'../images/Slide/slide_color.png',
            tit:'2nd'},
        {img:'../images/Slide/slide_color.png',
            tit:'3rd'},
    ];

    return (
        <>
            <div className={"inner"}>
                <Swiper
                    modules={[Autoplay,Scrollbar,Pagination,EffectCoverflow]}
                    spaceBetween={50}
                    slidesPerView={2.5}
                    centeredSlides={true}
                    effect={"coverflow"}
                    coverflowEffect={{
                        rotate:0,
                        stretch: 50,
                        depth: 100,
                        modifier:1,
                        slideShadows:false,
                    }}
                    autoplay={true}
                    rewind={true}
                    loop={false}
                    followFinger={false}
                    scrollbar={{draggable:true}}
                    pagination={{el:".swiper-pagination", clickable:true}}
                >
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[0].img})`}}><p className={"s2tit"}>{Slide2dex[0].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[1].img})`}}><p className={"s2tit"}>{Slide2dex[1].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[2].img})`}}><p className={"s2tit"}>{Slide2dex[2].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[2].img})`}}><p className={"s2tit"}>{Slide2dex[2].tit}</p></div></SwiperSlide>

                </Swiper>




            </div>

       </>
    );
};

export default Toppage_2nd;