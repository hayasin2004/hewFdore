"use client"
import React, {useState} from 'react';
import "./common.css"
import dummyData from "@/app/dummydata/slide_dummy";
import {DummyDataType}  from "@/app/dummydata/slide_dummy";
interface SlideShowProps {
    images: string[];
}

interface dummy {
    image?: string,
    text?: string,
}

const dummyData_slide: DummyDataType[] = dummyData

const dummyData_slide_map_item: dummy[] = dummyData.map((item, index) => {
    const image = item.url
    const text = item.randomString
    return {image, text}

})

const ToppageTopSlideshow: React.FC<dummy> = () => {
    const [currentSlide, setCurrentSlide] = useState(0);


    // 配列順に画像を取り出してcurrentSlideにセットしている, テキストも同じ仕組み
    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % dummyData_slide_map_item.length);
        // setCurrentText((prevSlide) => (prevSlide + 1));
        // console.log(currentText)
    };

    // ひとつ前の画像を取り出してcurrentSlideにセットしている , テキストも同じ仕組み
    const goToPrevSlide = () => {
        // setCurrentText((prevText) => (prevText - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
        setCurrentSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
    };
    // 長い計算の解説。
    // prevSlide - 1 + dummyData_slide_map_item.length は、負のインデックスを防ぐための計算。配列の長さを足すことで、負の値にならないようにしている。

    // 次の画像をcurrentSlide + 1 として表示している
    const nextSlideIndex = (currentSlide + 1) % dummyData_slide_map_item.length;

    return (
        <>
            <div className={"slide_master"}>

                <div className="slide-show">
                    <div className="photo_list">

                        <div className="slide_text">
                            <h1>{dummyData_slide_map_item[currentSlide].text}</h1>
                        </div>
                        <div
                            className="slide"
                            style={{backgroundImage: `url(${dummyData_slide_map_item[currentSlide].image})`}}
                        />
                        <div
                            className="slide_next"
                            style={{backgroundImage: `url(${dummyData_slide_map_item[nextSlideIndex].image})`}}
                        />
                    </div>
                    <button onClick={goToPrevSlide}>Prev</button>
                    <button onClick={goToNextSlide}>Next</button>
                </div>
            </div>
        </>
    );
};

export default ToppageTopSlideshow;