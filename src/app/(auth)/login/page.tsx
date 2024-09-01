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

const Login = () => {

    const {data : session, status} = useSession() ;
    const dateAll = [session?.user.name , session?.user.email , session?.user.image]

    if (status === "loading"){
        console.log("123456789128912345678")
    }
    console.log("これはsessionです" + dateAll)
    // ログインしたら自動的にトップページに飛ばされる
    const handleGithubLogin = () => {
        signIn("github" , {callbackUrl : "/login"})
    }
    const handleGooleLogin = () => {
        signIn("google" , {callbackUrl : "/toppage"})
    }
    const handleFacebookLogin = () => {
        signIn("facebook" , {callbackUrl : "/toppage"})
        console.log(handleFacebookLogin)
    }
    const handleInstagramLogin = () => {
        signIn("instagram" , {callbackUrl : "/toppage"})
    }

    return (

        <>
            <header>
                <h1>F'dore</h1>
                {dateAll.map((item, i) => (
                    <p key={i}>{item}</p>
                ))}
            </header>

            <button onClick={handleGithubLogin}> {/*ボタンを押したらトップページに飛ぶ関数を使ってます*/}
                githubでログイン
            </button>
            <button onClick={handleGooleLogin}> {/*ボタンを押したらトップページに飛ぶ関数を使ってます*/}
                Googleでログイン
            </button>
            {/*<button onClick={handleFacebookLogin}> /!*ボタンを押したらトップページに飛ぶ関数を使ってます*!/*/}
            {/*    FaceBookでログイン*/}
            {/*</button>*/}
            {/*<button onClick={handleInstagramLogin}> /!*ボタンを押したらトップページに飛ぶ関数を使ってます*!/*/}
            {/*    Instagramでログイン*/}
            {/*</button> →実装につきエラーが出たので一旦保留で*/}
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