"use client"
import React, {useEffect, useState} from 'react';
import "./common.css"


import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {Autoplay, Scrollbar, Pagination, EffectCoverflow} from "swiper/modules";
import Link from "next/link";

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
    const [isDesktop, setIsDesktop] = useState(false);

    // スライドの中身の辞書
    const Slide2dex = [
        {
            img: '../images/Slide/tops.png',
            tit: 'トップス',
            props: 'トップス'
        },
        {
            img: '../images/Slide/bottom.png',
            tit: 'ボトムス',
            props: 'ボトムス'
        },

        {
            img: '../images/Slide/outer.png',
            tit: 'アウター',
            props: 'アウター'

        },
        {
            img: '../images/Slide/hat.png',
            tit: '帽子',
            props: '帽子'

        },

        {
            img: '../images/Slide/shoes.png',
            tit: '靴',
            props: '靴'
        },
        {
            img: '../images/Slide/accessories.png',
            tit: 'アクセサリー',
            props: 'アクセサリー'
        },
        {
            img: '../images/Slide/perfume.png',
            tit: '香水',
            props: '香水'
        },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 768);
        }
    }, []);


    return (
        <>
            {isDesktop ? (

                <div className={"inner"}>
                    <Swiper
                        modules={[Autoplay, Scrollbar, Pagination, EffectCoverflow]}
                        spaceBetween={2}
                        slidesPerView={1}
                        centeredSlides={true}
                        effect={"coverflow"}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 50,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        autoplay={true}
                        rewind={true}
                        loop={false}
                        followFinger={false}
                        breakpoints={{
                            500: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            800: {
                                spaceBetween: 25,
                                slidesPerView: 1.5,
                            },
                            1250: {
                                spaceBetween: 50,
                                slidesPerView: 2.5,
                            },
                        }}
                        scrollbar={{draggable: true}}
                        pagination={{el: ".swiper-pagination", clickable: true}}

                    >
                        <SwiperSlide>
                            <Link href={`/searchResult/productCategorySearch/${Slide2dex[0].props}`}>
                                <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[0].img})`}}><p
                                    className={"s2tit"}>{Slide2dex[0].tit}</p></div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href={`/searchResult/productCategorySearch/${Slide2dex[1].props}`}>

                                <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[1].img})`}}><p
                                    className={"s2tit"}>{Slide2dex[1].tit}</p></div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href={`/searchResult/productCategorySearch/${Slide2dex[2].props}`}>

                                <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[2].img})`}}><p
                                    className={"s2tit"}>{Slide2dex[2].tit}</p></div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link　href={`/searchResult/productCategorySearch/${Slide2dex[3].props}`}>

                            <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[3].img})`}}><p
                                className={"s2tit"}>{Slide2dex[3].tit}</p></div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link　href={`/searchResult/productCategorySearch/${Slide2dex[4].props}`}>

                            <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[4].img})`}}><p
                                className={"s2tit"}>{Slide2dex[4].tit}</p></div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link　href={`/searchResult/productCategorySearch/${Slide2dex[5].props}`}>

                            <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[5].img})`}}><p
                                className={"s2tit"}>{Slide2dex[5].tit}</p></div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link　href={`/searchResult/productCategorySearch/${Slide2dex[6].props}`}>

                            <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[6].img})`}}><p
                                className={"s2tit"}>{Slide2dex[6].tit}</p></div>
                            </Link>
                        </SwiperSlide>

                    </Swiper>


                </div>

            ) : (
                <>
                    <h2 className={"responsiveSlideShowSearchCategory"}>Search Category</h2>
                    <div className={"inner"}>
                        <Swiper
                            modules={[Autoplay, Scrollbar, Pagination, EffectCoverflow]}
                            spaceBetween={2}
                            slidesPerView={1}
                            centeredSlides={true}
                            effect={"coverflow"}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 50,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            autoplay={true}
                            rewind={true}
                            loop={false}
                            followFinger={false}
                            breakpoints={{
                                500: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                800: {
                                    spaceBetween: 25,
                                    slidesPerView: 1.5,
                                },
                                1250: {
                                    spaceBetween: 50,
                                    slidesPerView: 2.5,
                                },
                            }}
                            scrollbar={{draggable: true}}
                            pagination={{el: ".swiper-pagination", clickable: true}}

                        >
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[0].props}`}>
                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[0].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[0].tit}</p></div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[1].props}`}>

                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[1].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[1].tit}</p></div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[2].props}`}>

                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[2].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[2].tit}</p></div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[3].props}`}>

                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[3].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[3].tit}</p></div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[4].props}`}>

                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[4].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[4].tit}</p></div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[5].props}`}>

                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[5].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[5].tit}</p></div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={`/searchResult/productCategorySearch/${Slide2dex[6].props}`}>

                                    <div className={"boxes"} style={{'backgroundImage': `url(${Slide2dex[6].img})`}}><p
                                        className={"s2tit"}>{Slide2dex[6].tit}</p></div>
                                </Link>
                            </SwiperSlide>

                        </Swiper>


                    </div>
                </>
            )}
        </>
    );
};

export default Toppage_2nd;