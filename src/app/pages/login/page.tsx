"use client"
import React from 'react';
import "./login.css"
import Image from "next/image"
import Link from "next/link";
import Script from 'next/script';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const Login = () => {

    return (

        <>
            <header>
                <h1>F'dore</h1>
            </header>

            <section>

                <div>
                    <div id="bgwhite">
                        <div id="form">
                            <h2>ログイン</h2><br/>
                            <form action="../Toppage/index.html" method="post">
                                <label htmlFor="UserName">ユーザー名</label><br/>

                                <input type="text" name="UserName" id="UserName"
                                       placeholder="Enter your UserName"/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email"
                                       placeholder="Enter your E-mail Address"/><br/>
                                <label htmlFor="Password">パスワード</label><br/>
                                <input type="password" name="Password" id="Password" placeholder="Enter Password"/><br/>
                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" name="PWCheck" id="PWCheck" placeholder="Enter Password again "/><br/>
                                <button type="submit">ログイン</button>
                            </form>
                        </div>
                    </div>

                    <div className={"flower_img"}>
                        <Image src={"/images/flower_a.png"} alt={"背景画像"} fill objectFit="cover"/>
                    </div>


                </div>
            </section>


            <div className="Slideshow">


                <Slide slidesToShow={1} duration={2000} indicators={true} arrows={false}>

                    <div className="each-slide-effect">
                        <div className={"slide_img"} style={{
                            backgroundImage: 'url(/images/Winter.png)'
                        }}>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div className={"slide_img"} style={{
                            backgroundImage: 'url(/images/MainImage.png)'
                        }}>
                        </div>
                    </div>
                    <div className="each-slide-effect">
                        <div className={"slide_img"} style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)'
                        }}>

                        </div>
                    </div>
                </Slide>

            </div>

        </>


    );
}


export default Login;