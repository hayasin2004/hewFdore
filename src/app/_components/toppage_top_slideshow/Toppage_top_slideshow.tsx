"use client";

import React, {useState, useEffect} from "react";
import "./common.css";
import {GetBlog} from "@/lib/client";
import Link from "next/link";


interface dummy {
    image?: string;
    text?: string;
    id?: string;
}

const ToppageTopSlideshow: React.FC<dummy> = () => {
    const [slideData, setSlideData] = useState<dummy[]>([]); // CMSデータ用のステート
    const [currentSlide, setCurrentSlide] = useState(0); // 現在のスライド
    const [nextSlide, setNextSlide] = useState(0); // 次のスライド
    const [nextanimate, setNextanimate] = useState(false); // 次スライドアニメーション
    const [prevanimate, setPrevanimate] = useState(false); // 前スライドアニメーション
    const [isChanging, setIsChanging] = useState(false); // スライド切り替え中かどうか
    console.log(nextSlide)

    useEffect(() => {
        const fetchCMSData = async () => {
            try {
                const data = await GetBlog();
                const formattedData = data.map((item: { id: string; image?: { url: string }; title?: string }) => ({
                    id: item.id,
                    image: item.image?.url || "",
                    text: item.title || "",
                }));
                setSlideData(formattedData);
            } catch (err) {
                console.error("CMSデータ取得エラー:", err);
            }
        };
        fetchCMSData();
    }, []);

    // 配列順に画像を取り出してcurrentSlideにセットしている, テキストも同じ仕組み
    // 次のスライドに処理
    const goToNextSlide = () => {
        setNextanimate(true);
        if (!isChanging && slideData.length > 0) {
            setIsChanging(true);
            setTimeout(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slideData.length);
            }, 880); // 遅延設定
            setTimeout(() => {
                setNextSlide((prevSlide) => (prevSlide + 2) % slideData.length);
            }, 920);
            setTimeout(() => {
                setNextanimate(false);
                setIsChanging(false);
            }, 2000);
        }
    };

    const goToPrevSlide = () => {
        setPrevanimate(true);
        if (!isChanging && slideData.length > 0) {
            setIsChanging(true);
            setTimeout(() => {
                setCurrentSlide((prevSlide) => (prevSlide - 1 + slideData.length) % slideData.length);
            }, 810);
            setTimeout(() => {
                setNextSlide((prevSlide) => (prevSlide - 1 + slideData.length) % slideData.length);
            }, 820);
            setTimeout(() => {
                setPrevanimate(false);
                setIsChanging(false);
            }, 2000);
        }
    };

    const nextSlideIndex = (currentSlide + 1) % slideData.length;
    return (
        <>
            <div>
                {/*cssアニメーション*/}
                {/*nextanimate　→　次の写真に行く時に発火するＣＳＳアニメーション*/}
                <div className="slide-show">
                    <button className={"topButton"} onClick={goToPrevSlide}>←</button>
                    <div className="photo_list">
                        {slideData.length > 0 && (
                            <>
                                <div
                                    className={`${nextanimate ? "animate" : ""} ${prevanimate ? "prevanimate" : ""} bgextend slide_text`}>
                                    <Link href={`/${slideData[nextSlideIndex]?.id}`}>
                                        <h1 className={"bgappear bgRLextend bgLRextend"}>
                                            {slideData[currentSlide]?.text}
                                        </h1>
                                    </Link>
                                </div>
                                <div className={"backgroundSlideColor"}>

                                    <div
                                        className={`${nextanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''}  bgextend slide`}>
                                        <Link href={`/${slideData[currentSlide]?.id}`}>
                                            <div className={"bgappear bgRLextend bgLRextend slide"}
                                                 style={{backgroundImage: `url(${slideData[currentSlide]?.image})`}}/>
                                        </Link>

                                    </div>
                                </div>
                                {/*prevanimate　→　前の写真に行く時に発火するＣＳＳアニメーション*/}

                                {/*classnameにanimateを付与すればスライドショーアニメーションは動く*/}
                                <div
                                    className={`${nextanimate ? 'smooth , animate' : ''} ${prevanimate ? 'prevanimate ' : ''} bgextend slide_next`}>

                                    <Link href={`/${slideData[nextSlideIndex]?.id}`}>

                                        {/*className={"bgappear bgRLextend bgLRextend slide_next"}*/}

                                        <div
                                            className={"bgappear bgRLextend bgLRextend slide_next "}
                                            // style={{backgroundImage: `url(${slideData[0].image})`}}
                                            style={{backgroundImage: `url(${slideData[nextSlideIndex]?.image})`}}
                                        />

                                    </Link>
                                </div>
                            </>
                        )}

                    </div>
                    <button className={"topButton"} onClick={goToNextSlide}>→</button>
                </div>
            </div>
        </>
    );
};

export default ToppageTopSlideshow;
