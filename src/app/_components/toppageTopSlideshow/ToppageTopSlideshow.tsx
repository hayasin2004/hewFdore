"use client"
import React from 'react';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Images from "next/image";
import "./toppageTopSlideshow.css"

// スライドショーを二つに分けます。
// 右のスライドショーはmap関数でtitle,imageを取得
// 右のスライドショーはmap関数でid + 1で取り出して、title,imageを取得　→　次の表示。
// 次へのボタン、戻るのボタンで二つを共有
const ToppageTopSlideshow = () => {
    return (
        <>

                <div className={"toppage_top_slideshow_left"}>
                    {/*テキストのスライドショー*/}
                    <div className={"left_slide_Text_position"}>
                    <Slide slidesToScroll={1} slidesToShow={1} transitionDuration={1230} infinite  indicators={true} arrows={false}>
                        <div className="each-slide-effect toppage_top_slideshow_slide_Text">
                            <div>
                                <h1>テスト１</h1>
                                <p>これはテスト１</p>
                            </div>　
                        </div>
                        <div className="each-slide-effect toppage_top_slideshow_slide_Text">　
                            <div>
                                <h1>テスト2</h1>
                                <p>これはテスト2</p>
                            </div>
                        </div>
                    </Slide>
                    </div>
                    {/*右側の画像スライドショー*/}
            <div className={"toppage_top_slideshow"}>
                    <div className={"left_slide_position"}>
                    <Slide slidesToScroll={1} slidesToShow={1} transitionDuration={1000} infinite indicators={true}>
                        <div className="each-slide-effect toppage_top_slideshow_slide">
                            <div>
                                <Images className={"slide_left_Image"} src={"/images/Slide/slide_color.png"} width={600}
                                        height={350} alt={"スライドショー"}/>
                            </div>
                        </div>
                        <div className="each-slide-effect toppage_top_slideshow_slide">
                            <div>
                                <Images className={"slide_left_Image"} src={"/images/Slide/slide_perfume.png"} width={600}
                                        height={350} alt={"スライドショー"}/>

                            </div>
                        </div>
                    </Slide>
                    </div>
                </div>
                {/*<div className={"toppage_top_slideshow_right"}>*/}
                {/*    <Slide slidesToScroll={1} slidesToShow={1} infinite indicators={true}>*/}
                {/*        <div className="each-slide-effect toppage_top_slideshow_first_slide">*/}
                {/*            <div>*/}
                {/*                <Images className={"slideImage"} src={"/images/Slide/slide_color.png"} width={400}*/}
                {/*                        height={300} alt={"スライドショー"}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="each-slide-effect toppage_top_slideshow_second_slide">*/}
                {/*            <div>*/}
                {/*                <Images className={"slideImage"} src={"/images/Slide/slide_perfume.png"} width={400}*/}
                {/*                        height={300} alt={"スライドショー"}/>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </Slide>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default ToppageTopSlideshow;