"use client"
import React, {useState} from 'react';
import "./login.css"
import Image from "next/image"
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {redirect} from "next/navigation";

import {loginUser} from "@/app/utils/loginUser";
import {useRouter} from "next/navigation";
import Toppage from "@/app/toppage/page";
import Link from "next/link";
import {User} from "@/models/User";
import {string} from "prop-types";
import {Form} from "react-router-dom";

interface User {
    userId: string
    username: string
    email: string
    password: string
    profilePicture: string
    coverProfilePicture: string
}


const Login = () => {
    const [userToken, setUserToken] = useState()
    const [email, setEmail] = useState<User | null>(null)
    const [username, setUsername] = useState<User | null>(null)
    const [password, setPassword] = useState<User | null>(null)/*正しくはログには[object object]が出ます*/
    console.log("これはログイン成功したときにメールアドレスが出ます:" + email);
    console.log("これはログインに成功した時にユーザー名が出ます:" + username);
    console.log("これはログインに成功した時にパスワードが出ます。:" + password);


    const [formValue, setFormValue]
        = useState({Email: "", Password: "", ConfirmPassword: ""})
    console.log(formValue.Password)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const allFieldsFilled = formValue.Email && formValue.Password && formValue.ConfirmPassword;
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
                                            alert("ログインに成功しました。おかえりなさい" + user.username)
                                            console.log("トークンが発行されました。" + user?.token);
                                            redirect("toppage")
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
                                <input type="text" name="Email" id="Email" onChange={onChange}
                                       value={formValue.Email}
                                       placeholder="Enter your E-mail Address"/><br/>
                                <label htmlFor="Password">パスワード</label><br/>
                                <input type="password" name="Password" id="Password" value={formValue.Password}
                                       onChange={onChange} placeholder="Enter Password"/><br/>
                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>

                                <input type="password" required name="ConfirmPassword" id="PWCheck"
                                       value={formValue.ConfirmPassword}
                                       placeholder="Enter Password again " onChange={onChange}/>

                                <button type="submit">
                                    ログイン
                                    {/*{allFieldsFilled ? <Link href={"/toppage"}>トップページへ</Link> :*/}
                                    {/*    <Link href={"/login"}>フォームを入力</Link>}*/}
                                </button>
                            </form>
                            <Link href={"register"}>
                                <p style={{marginTop: "10px"}}>ユ―ザーを持っていませんか？</p>
                            </Link>

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