"use client";

import React, {useState, useEffect} from "react";
import "./common.css";
import {GetBlog} from "@/lib/client";
import Link from "next/link";

interface SlideShowProps {
    images: string[];
}

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
                <div className="slide-show">
                    <button className={"topButton"} onClick={goToPrevSlide}>
                        ←
                    </button>
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

                                <div
                                    className={`${nextanimate ? "animate" : ""} ${prevanimate ? "prevanimate" : ""} bgextend slide`}>

                                    <Link href={`/${slideData[currentSlide]?.id}`}>
                                        <div
                                            className={"bgappear bgRLextend bgLRextend slide"}
                                            style={{
                                                backgroundImage: `url(${slideData[currentSlide]?.image})`,
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div
                                    className={`${nextanimate ? "animate" : ""} ${prevanimate ? "prevanimate" : ""} bgextend slide_next`}>
                                    <Link href={`/${slideData[nextSlideIndex]?.id}`}>
                                        <div
                                            className={"bgappear bgRLextend bgLRextend slide_next"}
                                            style={{
                                                backgroundImage: `url(${slideData[nextSlideIndex]?.image})`,
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                    <button className={"topButton"} onClick={goToNextSlide}>
                        →
                    </button>
                </div>
            </div>
        </>
    );
};

export default ToppageTopSlideshow;


// "use client";
//
// import React, { useState, useEffect } from "react";
// import "./common.css";
// import { GetBlog } from "@/lib/client";
//
// interface SlideShowProps {
//     images: string[];
// }
//
// interface dummy {
//     image?: string;
//     text?: string;
// }
//
// const ToppageTopSlideshow: React.FC<dummy> = () => {
//     const [slideData, setSlideData] = useState<dummy[]>([]); // CMSデータ用のステート
//     const [currentSlide, setCurrentSlide] = useState(0); // 現在のスライド
//     const [nextSlide, setNextSlide] = useState(0); // 次のスライド
//     const [nextanimate, setNextanimate] = useState(false); // 次スライドアニメーション
//     const [prevanimate, setPrevanimate] = useState(false); // 前スライドアニメーション
//     const [isChanging, setIsChanging] = useState(false); // スライド切り替え中かどうか
//
//     // CMSデータを取得してステートに設定
//     useEffect(() => {
//         const fetchCMSData = async () => {
//             try {
//                 const data = await GetBlog(); // CMSからデータを取得
//                 const formattedData = data.map((item: { image?: { url: string }; title?: string }) => ({
//                     image: item.image?.url || "",
//                     text: item.title || "",
//                 }));
//                 setSlideData(formattedData); // スライドデータを更新
//             } catch (err) {
//                 console.error("CMSデータ取得エラー:", err);
//             }
//         };
//         fetchCMSData();
//     }, []);
//
//     const goToNextSlide = () => {
//         setNextanimate(true);
//         if (!isChanging && slideData.length > 0) {
//             setIsChanging(true);
//             setTimeout(() => {
//                 setCurrentSlide((prevSlide) => (prevSlide + 1) % slideData.length);
//             }, 880); // 遅延設定
//             setTimeout(() => {
//                 setNextSlide((prevSlide) => (prevSlide + 2) % slideData.length);
//             }, 920);
//             setTimeout(() => {
//                 setNextanimate(false);
//                 setIsChanging(false);
//             }, 2000);
//         }
//     };
//
//     const goToPrevSlide = () => {
//         setPrevanimate(true);
//         if (!isChanging && slideData.length > 0) {
//             setIsChanging(true);
//             setTimeout(() => {
//                 setCurrentSlide((prevSlide) => (prevSlide - 1 + slideData.length) % slideData.length);
//             }, 810);
//             setTimeout(() => {
//                 setNextSlide((prevSlide) => (prevSlide - 1 + slideData.length) % slideData.length);
//             }, 820);
//             setTimeout(() => {
//                 setPrevanimate(false);
//                 setIsChanging(false);
//             }, 2000);
//         }
//     };
//
//     // 次のスライドのインデックス
//     const nextSlideIndex = (currentSlide + 1) % slideData.length;
//
//     return (
//         <>
//             <div>
//                 <div className="slide-show">
//                     <button className={"topButton"} onClick={goToPrevSlide}>
//                         ←
//                     </button>
//                     <div className="photo_list">
//                         {slideData.length > 0 && (
//                             <>
//                                 <div
//                                     className={`${nextanimate ? "animate" : ""} ${prevanimate ? "prevanimate" : ""} bgextend slide_text`}
//                                 >
//                                     <h1 className={"bgappear bgRLextend bgLRextend"}>
//                                         {slideData[currentSlide]?.text}
//                                     </h1>
//                                 </div>
//                                 <div
//                                     className={`${nextanimate ? "animate" : ""} ${prevanimate ? "prevanimate" : ""} bgextend slide`}
//                                 >
//                                     <div
//                                         className={"bgappear bgRLextend bgLRextend slide"}
//                                         style={{
//                                             backgroundImage: `url(${slideData[currentSlide]?.image})`,
//                                         }}
//                                     />
//                                 </div>
//                                 <div
//                                     className={`${nextanimate ? "animate" : ""} ${prevanimate ? "prevanimate" : ""} bgextend slide_next`}
//                                 >
//                                     <div
//                                         className={"bgappear bgRLextend bgLRextend slide_next"}
//                                         style={{
//                                             backgroundImage: `url(${slideData[nextSlideIndex]?.image})`,
//                                         }}
//                                     />
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                     <button className={"topButton"} onClick={goToNextSlide}>
//                         →
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default ToppageTopSlideshow;
//


// "use client"
// import React, {useState} from 'react';
// import "./common.css"
// import dummyData from "@/app/dummydata/slide_dummy";
// import {DummyDataType} from "@/app/dummydata/slide_dummy";
//
//
// interface SlideShowProps {
//     images: string[];
// }
//
// interface dummy {
//     image?: string,
//     text?: string,
// }
//
//
// const dummyData_slide_map_item: dummy[] = dummyData.map((item : DummyDataType, index) => {
//     const image = item.url
//     const text = item.randomString
//     return {image, text}
//
// })
//
// const ToppageTopSlideshow: React.FC<dummy> = () => {
//     // これが今のスライド
//     const [currentSlide, setCurrentSlide] = useState(0);
//     // これが次のスライド
//     const [nextSlide, setNextSlide] = useState(0);
//     // これがテキストのスライド
//     const [textSlide, setTextSlide] = useState(0);
//
//
//     // 次のスライド
//     // これが今のアニメーション
//     const [nextanimate, setNextanimate] = useState(false);
//
//     // ひとつ前のスライド
//     const [prevanimate, setPrevanimate] = useState(false);
//     const [isChanging, setIsChanging] = useState(false);
//
//     // 配列順に画像を取り出してcurrentSlideにセットしている, テキストも同じ仕組み
//     // 次のスライドに処理
//     const goToNextSlide = () => {
//         // console.log(currentText)
//         setNextanimate(true);
//         if (!isChanging) {
//             setIsChanging(true);
//             setTimeout(() => {
//                 setCurrentSlide((prevSlide) => (prevSlide + 1) % dummyData_slide_map_item.length);
//             }, 880); // 0.4秒の遅延
//             setTimeout(() => {
//                 setNextSlide((prevSlide) => (prevSlide + 2) % dummyData_slide_map_item.length);
//             }, 920); // 0.4秒の遅延　
//             setTimeout(() => {
//                 setNextanimate(false);
//                 setIsChanging(false);
//             } , 2000)
//         }
//         // setCurrentText((prevSlide) => (prevSlide + 1));
//         // console.log(currentText)
//         //
//         // setTimeout(() => {
//         // }, 300);
//     };
//
//
//     // ひとつ前の画像を取り出してcurrentSlideにセットしている , テキストも同じ仕組み
//     // ひとつ前のスライドに戻るときの処理
//     const goToPrevSlide = () => {
//             // setCurrentText((prevText) => (prevText - 1 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
//             console.log("kkokokokokokokokokokokokokokokokkoo")
//
//             setPrevanimate(true);
//             if (!isChanging) {
//                 setIsChanging(true);
//                 setTimeout(() => {
//                     setCurrentSlide((prevSlide) => (prevSlide - 2 + dummyData_slide_map_item.length) % dummyData_slide_map_item.length);
//                 }, 810)
//                 setTimeout(() => {
//                     setNextSlide((prevSlide) => (prevSlide + 1) % dummyData_slide_map_item.length);
//                 }, 820); // 0.4秒の遅延
//                 setTimeout(() => {
//                     setPrevanimate(false);
//                     setIsChanging(false);
//                 }, 2000)
//             }
//         }
//     ;
//     // 長い計算の解説。
//     // prevSlide - 1 + dummyData_slide_map_item.length は、負のインデックスを防ぐための計算。配列の長さを足すことで、負の値にならないようにしている。
//
//     // 次の画像をcurrentSlide + 1 として表示している
//     const nextSlideIndex = ((nextSlide + 1) % dummyData_slide_map_item.length);
//
//     return (
//         <>
//             <div>
//                 {/*cssアニメーション*/}
//                 {/*nextanimate　→　次の写真に行く時に発火するＣＳＳアニメーション*/}
//                 <div className="slide-show">
//                     <button className={"topButton"} onClick={goToPrevSlide}>←</button>
//                     <div className="photo_list">
//
//                         <div
//                             className={`${nextanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide_text `}>
//                             <h1 className={"bgappear bgRLextend bgLRextend "}>{dummyData_slide_map_item[currentSlide].text}</h1>
//                         </div>
//                         <div
//                             className={`${nextanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide`}>
//
//                             <div className={"bgappear bgRLextend bgLRextend slide"}
//                                  style={{backgroundImage: `url(${dummyData_slide_map_item[currentSlide].image})`}}/>
//
//                         </div>
//                         {/*prevanimate　→　前の写真に行く時に発火するＣＳＳアニメーション*/}
//
//                         <div
//                             className={`${nextanimate ? 'animate' : ''} ${prevanimate ? 'prevanimate' : ''} bgextend slide_next`}>
//
//                             <div
//                                 className={"bgappear bgRLextend bgLRextend slide_next"}
//                                 style={{backgroundImage: `url(${dummyData_slide_map_item[nextSlideIndex].image})`}}
//                             />
//                         </div>
//                     </div>
//                     <button className={"topButton"} onClick={goToNextSlide}>→</button>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default ToppageTopSlideshow;