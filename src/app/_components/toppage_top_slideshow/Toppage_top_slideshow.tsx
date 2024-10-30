"use client"
import React, {useState} from 'react';
import "./common.css"
import dummyData from "@/app/dummydata/slide_dummy";
import {DummyDataType} from "@/app/dummydata/slide_dummy";

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

    const [nextSlide, setNextSlide] = useState(0);

    const [textSlide, setTextSlide] = useState(0);

    // 今のアニメーション
    const [nextanimate, setNextanimate] = useState(false);
    // これが次のアニメーション
    const [secondanimate, setSecondanimate] = useState(false);

    const [textanimate, setTextanimate] = useState(false);

    // ひとつ前のスライド
    const [prevanimate, setPrevanimate] = useState(false);

    const [prevsecondanimate, setPrevsecondanimate] = useState(false);

    const [prevtextanimate, setPrevtextanimate] = useState(false);

    const [isChanging, setIsChanging] = useState(false);

    // 配列順に画像を取り出してcurrentSlideにセットしている, テキストも同じ仕組み
    // 次のスライドに処理
    const goToNextSlide = () => {
        // setCurrentText((prevSlide) => (prevSlide + 1));
        // console.log(currentText)
        setNextanimate(true);
        if (!isChanging) {
            setIsChanging(true);
            setTimeout(() => {
                setNextanimate(false);
                setIsChanging(false);
            }, 1500); // 0.4秒の遅延
            setTimeout(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % dummyData_slide_map_item.length);
            }, 1000); // 0.4秒の遅延
    //nextslide
            setTimeout(() => {
                setNextSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
                setSecondanimate(true);
            },2000)
            setSecondanimate(false);
    //textanimete
            setTimeout(() => {
                setTextSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
                setTextanimate(true);
                console.log("padjfajdilfajofjaosjfjsodfajojf")
            },2000)
            setTextanimate(false);
        }
        // setCurrentText((prevSlide) => (prevSlide + 1));
        // console.log(currentText)
        //
        // setTimeout(() => {
        // }, 300);
    };

    // ひとつ前の画像を取り出してcurrentSlideにセットしている , テキストも同じ仕組み
    // ひとつ前のスライドに戻るときの処理
    const goToPrevSlide = () => {
            // setCurrentText((prevText) => (prevText - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
            console.log("kkokokokokokokokokokokokokokokokkoo")

        setPrevanimate(true);
            if (!isChanging) {
                setIsChanging(true);
                setTimeout(() => {
                    setPrevanimate(false);
                    setIsChanging(false);
                }, 1500); // 0.4秒の遅延
                setTimeout(() => {
                    setCurrentSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
                },700)

                setTimeout(() => {
                    setNextSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
                    setPrevsecondanimate(true);
                },2000)
                setPrevsecondanimate(false);

                setTimeout(() => {
                    setTextSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
                    setPrevtextanimate(true);
                },2000)
                setPrevtextanimate(false);


            }
        }
    ;
    // 長い計算の解説。
    // prevSlide - 1 + dummyData_slide_map_item.length は、負のインデックスを防ぐための計算。配列の長さを足すことで、負の値にならないようにしている。

    // 次の画像をcurrentSlide + 1 として表示している
    const nextSlideIndex = (nextSlide + 1) % dummyData_slide_map_item.length;

    return (
        <>
            <div>
                {/*cssアニメーション*/}
                {/*nextanimate　→　次の写真に行く時に発火するＣＳＳアニメーション*/}
                <div className="slide-show">
                    <button className={"topButton"} onClick={goToPrevSlide}>←</button>
                    <div className="photo_list">

                        <div className={`${textanimate ? 'animate' : ''} ${prevtextanimate ? 'prevanimate' : ''} bgextend slide_text `}>
                            <h1 className={"bgappear bgRLextend bgLRextend "}>{dummyData_slide_map_item[currentSlide].text}</h1>
                        </div>
                        <div className={`${nextanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide`}>

                            <div className={"bgappear bgRLextend bgLRextend slide"}
                                 style={{backgroundImage: `url(${dummyData_slide_map_item[currentSlide].image})`}}/>

                        </div>
                        {/*prevanimate　→　前の写真に行く時に発火するＣＳＳアニメーション*/}

                        <div className={`${secondanimate ? 'animate' : ''} ${prevsecondanimate ? 'prevanimate' : ''} bgextend slide_next`}>

                        <div
                            className={"bgappear bgRLextend bgLRextend slide_next"}
                            style={{backgroundImage: `url(${dummyData_slide_map_item[nextSlideIndex].image})`}}
                        />
                        </div>
                    </div>
                    <button className={"topButton"} onClick={goToNextSlide}>→</button>
                </div>
            </div>
        </>
    );
};

export default ToppageTopSlideshow;