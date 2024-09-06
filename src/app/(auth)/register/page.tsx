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
import {redirect, useRouter} from "next/navigation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import createUser from "@/app/utils/registerUser";
import Login from '../login/page';
import {useNavigate} from "react-router";


const Register = () => {
    // {
    //     const {data: session, status} = useSession();
    //     const dateAll = [session?.user.name, session?.user.email, session?.user.image]
    //
    //     if (status === "loading") {
    //         console.log("123456789128912345678")
    //     }
    //     console.log("これはsessionです" + dateAll)
    //     // ログインしたら自動的にトップページに飛ばされる
    //     const handleGithubLogin = () => {
    //         signIn("github", {callbackUrl: "/login"})
    //     }
    //     const handleGooleLogin = () => {
    //         signIn("google", {callbackUrl: "/toppage"})
    // }
    // const handleFacebookLogin = () => {
    //     signIn("facebook" , {callbackUrl : "/toppage"})
    //     console.log(handleFacebookLogin)
    // }
    // const handleInstagramLogin = () => {
    //     signIn("instagram" , {callbackUrl : "/toppage"})
    // }
    // }

    // フォームがもしすべて入力されていたら次のページ
    const [formValue, setFormValue]
        = useState({UserName :"" , Email : "" , Password : "" , ConfirmPassword : ""})
        console.log(formValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target;
        setFormValue({...formValue, [name]: value});
    }
    const handleSubmit = (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formValue.UserName && formValue.Email && formValue.Password && formValue.ConfirmPassword ){
            
        }else{
            window.alert("すべてのフォームを入力の上再度送信してください。")
        }
    }
    return (


        <>
            <header>
                <h1>F'dore</h1>
            </header>
            {/*<button onClick={handleGithubLogin}> /!*ボタンを押したらトップページに飛ぶ関数を使ってます*!/*/}
            {/*    githubでログイン*/}
            {/*</button>*/}
            {/*<button onClick={handleGooleLogin}> /!*ボタンを押したらトップページに飛ぶ関数を使ってます*!/*/}
            {/*    Googleでログイン*/}
            {/*</button>*/}

            <section>

                <div>
                    <div>

                    </div>
                    <div id="bgwhite">
                        <div id="form">
                            <h2>ユーザー登録</h2><br/>
                            <form onSubmit={handleSubmit}  action={async (data: FormData) => {
                                const username = data.get("userName") as string
                                const email = data.get("Email") as string
                                const password = data.get("Password") as string
                                await createUser(username, email, password).then()
                            }}>
                                <label htmlFor="UserName">ユーザー名</label><br/>

                                <input type="text" name="UserName" id="UserName" required onChange={onChange} value={formValue.UserName}
                                       placeholder="Enter your UserName"/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email"  required value={formValue.Email}
                                       placeholder="Enter your E-mail Address" onChange={onChange}/><br/>

                                <input required type="password" name="Password" id="Password" value={formValue.Password}
                                       placeholder="Enter Password" onChange={onChange}/><br/>

                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" required name="ConfirmPassword" id="PWCheck" value={formValue.ConfirmPassword}
                                       placeholder="Enter Password again " onChange={onChange}/><br/>

                                <button type="submit">
                                        ユ―ザーを作成
                                </button>
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