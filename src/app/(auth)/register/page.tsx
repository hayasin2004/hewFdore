"use client"
import React from 'react';
import "./register.css"
import Image from "next/image"
import Link from "next/link";
import Script from 'next/script';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {useSession, signIn, signOut} from "next-auth/react"


const Register = () => {
    return (

        <>
            <header>
                <h1>F'dore</h1>
            </header>

            <section>

                <div>
                    <div>

                    </div>
                    <div id="bgwhite">
                        <div id="form">
                            <h2>ユーザー登録</h2><br/>
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
                                <button type="submit">ユ―ザーを作成</button>
                            </form>
                        </div>
                    </div>

                    <div className={"flower_img"}>
                        <Image src={"/images/flower_a.png"} alt={"背景画像"} fill objectFit="cover"/>
                    </div>


                </div>
            </section>


            <div className="Slideshow">


                <Slide slidesToShow={1} duration={2000} infinite={true} indicators={true} arrows={false}>

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

                </Slide>

            </div>

        </>


    );
}


export default Register;