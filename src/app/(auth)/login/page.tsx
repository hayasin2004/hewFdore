"use client"
import React, {useContext} from 'react';
import "./login.css"
import Image from "next/image"
import Link from "next/link";
import Script from 'next/script';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {signIn, useSession} from "next-auth/react";
import {trackDynamicDataAccessed} from "next/dist/server/app-render/dynamic-rendering";
import {User} from "@/models/User";
import {string} from "prop-types";
import {loginUser} from "@/app/utils/loginUser";

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
                            <form action={ async (data : FormData) => {
                                const email = data.get("Email") as string
                                const password = data.get("Password") as string /*メールアドレスとパスワードをデータベースに問い合わせてる*/
                                await loginUser(email, password).then(user => {
                                    if (user) {
                                        console.log("ログインメールアドレス" + user.email)
                                    }
                                })
                            }} method="post"


                            >
                                {/*<label htmflFor="UserName">ユーザー名</label><br/>*/}

                                {/*<input type="text" name="UserName" id="UserName"*/}
                                {/*       placeholder="Enter your UserName"/><br/>*/}
                                <label htmlFor="Email" >Email</label><br/>
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


export default Login;