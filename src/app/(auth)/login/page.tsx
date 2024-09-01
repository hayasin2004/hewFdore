"use client"
import React, {useState} from 'react';
import "./login.css"
import Image from "next/image"
import Link from "next/link";
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {signIn, useSession} from "next-auth/react";
import {User} from "@/models/User";

import {loginUser} from "@/app/utils/loginUser";
import {useRouter} from "next/navigation";
import Toppage from "@/app/toppage/page";

const Login = () => {
    const router = useRouter();
    const [userToken, setUserToken] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    console.log("これはログイン成功したときにユ―ザーが出ます:" + email);/*正しくはログには[object object]が出ます*/
    console.log("これはログイン成功したときにメールアドレスが出ます:" + email);
    console.log("これはログインに成功した時にユーザー名が出ます:" + username);
    console.log("これはログインに成功した時にパスワードが出ます。:" + password);
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
                            <form action={async (data: FormData) => {
                                const email = data.get("Email") as string
                                const password = data.get("Password") as string /*メールアドレスとパスワードをデータベースに問い合わせてる*/
                                await loginUser(email, password).then(user => {
                                    if (user === undefined) {
                                        /*もしユーザー情報が間違えたいたらuserにundefinedが返って来る。*/
                                        alert("メールアドレスもしくはパスワードが違う可能性があります。")
                                    }
                                    if (user) {
                                        const token = user.token
                                        if (!token) {
                                            console.log("ログイン情報が違う可能性があります。")
                                        } else {
                                            localStorage.setItem("token", token)
                                            setUserToken(token)
                                            setEmail(user.email)
                                            setUsername(user.username)
                                            setPassword(user.password)
                                            alert("ログインに成功しました。おかえりなさい"+user.username)
                                            console.log("トークンが発行されました。" + user?.token);
                                            return (user)
                                        }
                                    }
                                })
                            }} method="post"


                            >
                                {/*<label htmflFor="UserName">ユーザー名</label><br/>*/}

                                {/*<input type="text" name="UserName" id="UserName"*/}
                                {/*       placeholder="Enter your UserName"/><br/>*/}
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