"use client"
import React, {useEffect, useState} from 'react';
import "./login.css"
import Image from "next/image"
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {redirect, useRouter} from "next/navigation";

import {loginUser} from "@/app/utils/user/loginUser";
import Link from "next/link";
import confirmToken from "@/app/utils/user/confirmToken";


const Login = () => {
    const router = useRouter();

    useEffect(() => {
        const existTenMinToken = async () => {
            const TenMinToken: string | null = await localStorage.getItem("TenMinToken");
            if (TenMinToken !== null) {
                try {
                    const decoded = await confirmToken(TenMinToken);
                    console.log(decoded)
                    if (typeof decoded !== "string") {
                        window.alert("メール認証が終わっていない可能性があります。先に終わらしてください")
                        router.push(`/AuthGmail/${decoded?.email}`)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }
        existTenMinToken();
    }, [router])


    const [formValue, setFormValue]
        = useState({Email: "", Password: "", ConfirmPassword: ""})
    console.log(formValue.Password)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    }
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 768);
        }
    }, []);
    return (
        <>
            {isDesktop ? (

                <div className={"allScreen"}>
                    <div className={"flower_img"}>
                        <Image src={"/images/flower_a.png"} alt={"背景画像"} fill objectFit="cover"/>
                    </div>
                    <header className={"loginHeader"}>
                        <Link href={'/'}>
                            <h1 className={"loginHeaderH1"}>F&apos;dore</h1>
                        </Link>
                    </header>

                    <section id={"login"}>

                        <div>
                            <div id="bgwhite">
                                <div id="form">
                                    <h2>ログイン</h2><br/>
                                    <form action={async (data: FormData) => {
                                        const email = data.get("Email") as string
                                        const password = data.get("Password") as string
                                        const confirmPassword = data.get("ConfirmPassword") as string/*メールアドレスとパスワードをデータベースに問い合わせてる*/
                                        if (email.includes("@")) {

                                            await loginUser(email, password, confirmPassword).then(user => {
                                                if (user == undefined || user == null) {
                                                    /*もしユーザー情報が間違えたいたらuserにundefinedが返って来る。*/
                                                    alert("メールアドレスもしくはパスワードが違う可能性があります。")
                                                }
                                                if (user) {
                                                    const token: string | null = user.token
                                                    if (!token) {
                                                        console.log("ログイン情報が違う可能性があります。")
                                                    } else {
                                                        localStorage.setItem("token", token)
                                                        alert("ログインに成功しました。おかえりなさい" + user.username)
                                                        console.log("トークンが発行されました。" + user?.token);
                                                        redirect("toppage")
                                                        return (user)
                                                    }
                                                }
                                            })
                                        } else {
                                            window.alert("メールアドレスに@が含まれていません。今一度入力しなおしてください")
                                            return;
                                        }
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
                                    <Link href={"/register"}>
                                        <p style={{marginTop: "10px"}}>ユ―ザーを持っていませんか？</p>
                                    </Link>
                                    <Link href={"/"}>
                                        <p style={{marginTop: "10px"}}>トップページへ</p>
                                    </Link>

                                </div>
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


            ) : (
                <div className={"allScreen"}>
                    <div className={"flower_img"}>
                        <Image src={"/images/flower_a.png"} alt={"背景画像"} fill objectFit="cover"/>
                    </div>
                    <header className={"loginHeader"}>
                        <Link href={'/'}>
                            <h1 className={"loginHeaderH1"}>F&apos;dore</h1>
                        </Link>
                    </header>


                    <div>
                        <div id="bgwhite">
                            <div id="form">
                                <h2>ログイン</h2><br/>
                                <form action={async (data: FormData) => {
                                    const email = data.get("Email") as string
                                    const password = data.get("Password") as string
                                    const confirmPassword = data.get("ConfirmPassword") as string/*メールアドレスとパスワードをデータベースに問い合わせてる*/
                                    if (email.includes("@")) {

                                        await loginUser(email, password, confirmPassword).then(user => {
                                            if (user == undefined || user == null) {
                                                /*もしユーザー情報が間違えたいたらuserにundefinedが返って来る。*/
                                                alert("メールアドレスもしくはパスワードが違う可能性があります。")
                                            }
                                            if (user) {
                                                const token: string | null = user.token
                                                if (!token) {
                                                    console.log("ログイン情報が違う可能性があります。")
                                                } else {
                                                    localStorage.setItem("token", token)
                                                    alert("ログインに成功しました。おかえりなさい" + user.username)
                                                    console.log("トークンが発行されました。" + user?.token);
                                                    redirect("toppage")
                                                    return (user)
                                                }
                                            }
                                        })
                                    } else {
                                        window.alert("メールアドレスに@が含まれていません。今一度入力しなおしてください")
                                        return;
                                    }
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
                                <Link href={"/register"}>
                                    <p style={{marginTop: "10px"}}>ユ―ザーを持っていませんか？</p>
                                </Link>
                                <Link href={"/"}>
                                    <p style={{marginTop: "10px"}}>トップページへ</p>
                                </Link>

                            </div>
                        </div>

                    </div>

                </div>
            )}
        </>
    );
}


export default Login;
