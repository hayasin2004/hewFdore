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

const dummyData_slide_map_item: dummy[] = dummyData.map((item, index) => {
    const image = item.url
    const text = item.randomString　
    return {image, text}
})


const ToppageTopSlideshow: React.FC<dummy> = () => {
    // これが今のスライド
    const [currentSlide, setCurrentSlide] = useState(0);
    // これが次のスライド
    const [nextSlide, setNextSlide] = useState(0);
    // これがテキストのスライド
    const [textSlide, setTextSlide] = useState(0);　

    // 次のスライド
    // これが今のアニメーション
    const [nextanimate, setNextanimate] = useState(false);
    // これが次のアニメーション
    const [nextTestanimate, setNextTestanimate] = useState(false);
    // これがテキストのアニメーション
    const [textanimate, setTextanimate] = useState(false);
    // ひとつ前のスライド
    const [prevanimate, setPrevanimate] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    // 配列順に画像を取り出してcurrentSlideにセットしている, テキストも同じ仕組み
    // 次のスライドに処理
    const goToNextSlide = () => {
        // console.log(currentText)
        setNextanimate(true);
        if (!isChanging) {
            setIsChanging(true);
            setTimeout(() => {
                setNextanimate(false);
                setIsChanging(false);
            }, 700); // 0.4秒の遅延
            setTimeout(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % dummyData_slide_map_item.length);
                setIsChanging(false);
            }, 700); // 0.4秒の遅延
            setTimeout(() => {
                setNextSlide((prevSlide) => (prevSlide + 2) % dummyData_slide_map_item.length);
                setNextTestanimate(true);
                setIsChanging(false);
            }, 700); // 0.4秒の遅延
            setNextTestanimate(false);
            setTimeout(() => {
                setTextanimate(true);
                setTextSlide((prevSlide) => (prevSlide + 1) % dummyData_slide_map_item.length);
                setIsChanging(false);
            }, 700); // 0.4秒の遅延
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
                }, 1000); // 0.4秒の遅延
                setTimeout(() => {
                    setPrevanimate(false);

                    setCurrentSlide((prevSlide) => (prevSlide - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
                }, 700)
                setTimeout(() => {
                    setPrevanimate(false);

                    setNextSlide((prevSlide) => (prevSlide - 2) % dummyData_slide_map_item.length);
                }, 900); // 0.4秒の遅延

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
                        <div
                            className={`${textanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide_text `}>
                            <h1 className={"bgappear bgRLextend bgLRextend "}>{dummyData_slide_map_item[textSlide].text}</h1>
                        </div>
                        <div
                            className={`${nextanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide`}>

                            <div className={"bgappear bgRLextend bgLRextend slide"}
                                 style={{backgroundImage: `url(${dummyData_slide_map_item[currentSlide].image})`}}/>

                        </div>
                        {/*prevanimate　→　前の写真に行く時に発火するＣＳＳアニメーション*/}

                        <div
                            className={`${nextTestanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide_next`}>

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