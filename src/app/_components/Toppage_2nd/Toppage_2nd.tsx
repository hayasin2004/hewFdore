"use client"
import React  from 'react';
import "./common.css"


import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {Autoplay,Scrollbar,Pagination,EffectCoverflow} from "swiper/modules";

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
            img: '../images/Slide/tops.png',
        tit:'トップス'},
        {img:'../images/Slide/bottom.png',
            tit:'ボトム'},
        {img:'../images/Slide/hat.png',
            tit:'帽子'},
        {img:'../images/Slide/outer.png',
            tit:'アウター'},
        {img:'../images/Slide/shirt.png',
            tit:'シャツ'},
        {img:'../images/Slide/longShirt.png',
            tit:'長袖'},
        {img:'../images/Slide/perfume.png',
            tit:'香水'},
        {img:'../images/Slide/shoes.png',
            tit:'靴'},
    ];

    return (
        <>
            <div className={"inner"}>
                <Swiper
                    modules={[Autoplay,Scrollbar,Pagination,EffectCoverflow]}
                    spaceBetween={20}
                    slidesPerView={1}
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
                    breakpoints={{
                        500:{
                            slidesPerView:1,
                            spaceBetween:20,
                        },
                        800:{
                            spaceBetween:25,
                            slidesPerView:1.5,
                        },
                        1250:{
                            spaceBetween:50,
                            slidesPerView:2.5,
                        },
                    }}
                    scrollbar={{draggable:true}}
                    pagination={{el:".swiper-pagination", clickable:true}}

                >
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[0].img})`}}><p className={"s2tit"}>{Slide2dex[0].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[1].img})`}}><p className={"s2tit"}>{Slide2dex[1].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[2].img})`}}><p className={"s2tit"}>{Slide2dex[2].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[3].img})`}}><p className={"s2tit"}>{Slide2dex[3].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[4].img})`}}><p className={"s2tit"}>{Slide2dex[4].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[5].img})`}}><p className={"s2tit"}>{Slide2dex[5].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[6].img})`}}><p className={"s2tit"}>{Slide2dex[6].tit}</p></div></SwiperSlide>
                    <SwiperSlide><div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[7].img})`}}><p className={"s2tit"}>{Slide2dex[7].tit}</p></div></SwiperSlide>

                </Swiper>




            </div>

       </>
    );
};

export default Toppage_2nd;