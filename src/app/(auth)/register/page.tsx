"use client"
import React, {useState} from 'react';
import "./register.css"
import Image from "next/image"
import Link from "next/link";
import Script from 'next/script';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {useSession, signIn, signOut} from "next-auth/react"
import axios from "axios";
import {useRouter} from "next/navigation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import createUser from "@/app/utils/user/registerUser";
import Login from '../login/page';


const Register = () => {
    const {data: session, status} = useSession();
    const dateAll = [session?.user.name, session?.user.email, session?.user.image]

    if (status === "loading") {
        console.log("123456789128912345678")
    }
    console.log("これはsessionです" + dateAll)
    // ログインしたら自動的にトップページに飛ばされる
    const handleGithubLogin = () => {
        signIn("github", {callbackUrl: "/login"})
    }
    const handleGooleLogin = () => {
        signIn("google", {callbackUrl: "/toppage"})
    }
    // const handleFacebookLogin = () => {
    //     signIn("facebook" , {callbackUrl : "/toppage"})
    //     console.log(handleFacebookLogin)
    // }
    // const handleInstagramLogin = () => {
    //     signIn("instagram" , {callbackUrl : "/toppage"})
    // }
    return (

        <div className={"allScreen"}>
            {dateAll.map((item) => (
                <ul key={item}>
                    <li>
                        {item}
                    </li>
                </ul>
            ))}
            <header>
                <h1>F'dore</h1>
            </header>
            <button onClick={handleGithubLogin}> {/*ボタンを押したらトップページに飛ぶ関数を使ってます*/}
                githubでログイン
            </button>
            <button onClick={handleGooleLogin}> {/*ボタンを押したらトップページに飛ぶ関数を使ってます*/}
                Googleでログイン
            </button>

            <section id={"register"}>

                <div>
                    <div>

                    </div>
                    <div id="bgwhite">
                        <div id="form">
                            <h2>ユーザー登録</h2><br/>
                            <form action={async (data: FormData) => {
                                const username = data.get("userName") as string
                                const email = data.get("Email") as string
                                const password = data.get("Password") as string
                                await createUser(username, email, password).then()
                            }}>
                                <label htmlFor="UserName">ユーザー名</label><br/>

                                <input type="text" name="userName" id="UserName" required
                                       placeholder="Enter your UserName"/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email" required
                                       placeholder="Enter your E-mail Address"/><br/>
                                <label htmlFor="Password">パスワード</label><br/>
                                <input required type="password" name="Password" id="Password"
                                       placeholder="Enter Password"/><br/>

                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" required name="PWCheck" id="PWCheck"
                                       placeholder="Enter Password again "/><br/>

                                <button type="submit">
                                    ユ―ザーを作成
                                </button>
                                <Link href={"login"}>
                                    <p style={{marginTop: "10px"}}>ユ―ザー作成済ですか？</p>
                                </Link>
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

        </div>


    );
}


export default Register;