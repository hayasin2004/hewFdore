"use client"
import React, {useEffect, useState} from 'react';
import "./register.css"
import Image from "next/image"
import Link from "next/link";
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import {useSession} from "next-auth/react"
import createUser from "@/app/utils/user/registerUser";
import {UserType} from "@/app/api/user/catchUser/route";


const Register = () => {
    const [responseUserData, setResponseUserData] = useState<UserType | null | undefined>(null)
    const {data: session, status} = useSession();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 768);
        }
    }, []);
    const dateAll = [session?.user.name, session?.user.email, session?.user.image]
    console.log(responseUserData)
    if (status === "loading") {
        console.log("123456789128912345678")
    }
    // console.log("これはsessionです" + dateAll)
    // ログインしたら自動的にトップページに飛ばされる
    // const handleGithubLogin = () => {
    //     signIn("github", {callbackUrl: "/login"})
    // }
    // const handleGooleLogin = () => {
    //     signIn("google", {callbackUrl: "/toppage"})
    // }
    // const handleFacebookLogin = () => {
    //     signIn("facebook" , {callbackUrl : "/toppage"})
    //     console.log(handleFacebookLogin)
    // }
    // const handleInstagramLogin = () => {
    //     signIn("instagram" , {callbackUrl : "/toppage"})
    // }
    return (
        <>
            {isDesktop ? (

                <div className={"allScreen"}>
                    {dateAll.map((item) => (
                        <ul key={item}>
                            <li>
                                {item}
                            </li>
                        </ul>
                    ))}
                    <header>
                        <h1>F&apos;dore</h1>
                    </header>
                    {/*<button onClick={handleGithubLogin}> /!*ボタンを押したらトップページに飛ぶ関数を使ってます*!/*/}
                    {/*    githubでログイン*/}
                    {/*</button>*/}
                    {/*<button onClick={handleGooleLogin}> /!*ボタンを押したらトップページに飛ぶ関数を使ってます*!/*/}
                    {/*    Googleでログイン*/}
                    {/*</button>*/}

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
                                        const PWCheck = data.get("PWCheck") as string
                                        if (email.includes("@")) {
                                            await createUser(username, email, password, PWCheck).then(
                                                (data) => {
                                                    if (data?.status == "existUsername") {
                                                        console.log("ここに登録ログ北")
                                                        window.alert("そのユーザー名は既に作成されています。")
                                                    } else {
                                                        if (data) {
                                                            const UserDataParse = JSON.parse(data?.newUser as string)
                                                            const TokenDataParse = JSON.parse(data?.TenMinToken as string)
                                                            console.log(UserDataParse)
                                                            setResponseUserData(UserDataParse)
                                                            localStorage.setItem("TenMinToken", TokenDataParse)
                                                        }
                                                    }
                                                }
                                            )
                                        } else {
                                            window.alert("メールアドレスに@が含まれていません。今一度入力しなおしてください")
                                            return;
                                        }
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

                                        {responseUserData == null ? (
                                                <>
                                                    <button type="submit">
                                                        ユ―ザーを作成
                                                    </button>
                                                    <Link href={"/login"}>
                                                        <p style={{marginTop: "10px"}}>ユ―ザー作成済ですか？</p>
                                                    </Link>
                                                    <Link href={"/"}>
                                                        <p style={{marginTop: "10px"}}>トップページへ</p>
                                                    </Link>
                                                </>
                                            )
                                            : (<Link href={{pathname: `/AuthGmail/${responseUserData?.email}`}}>
                                                <button className={"submit"}>
                                                    メール認証に進む
                                                </button>
                                            </Link>)}
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


            ) : (
                <div className={"allScreen"}>
                    {dateAll.map((item) => (
                        <ul key={item}>
                            <li>
                                {item}
                            </li>
                        </ul>
                    ))}
                    <header>
                        <h1>F&apos;dore</h1>
                    </header>
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
                                        const PWCheck = data.get("PWCheck") as string
                                        if (email.includes("@")) {
                                            await createUser(username, email, password, PWCheck).then(
                                                (data) => {
                                                    if (data?.status == "existUsername") {
                                                        console.log("ここに登録ログ北")
                                                        window.alert("そのユーザー名は既に作成されています。")
                                                    } else {
                                                        if (data) {
                                                            const UserDataParse = JSON.parse(data?.newUser as string)
                                                            const TokenDataParse = JSON.parse(data?.TenMinToken as string)
                                                            console.log(UserDataParse)
                                                            setResponseUserData(UserDataParse)
                                                            localStorage.setItem("TenMinToken", TokenDataParse)
                                                        }
                                                    }
                                                }
                                            )
                                        } else {
                                            window.alert("メールアドレスに@が含まれていません。今一度入力しなおしてください")
                                            return;
                                        }
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

                                        {responseUserData == null ? (
                                                <>
                                                    <button type="submit">
                                                        ユ―ザーを作成
                                                    </button>
                                                    <Link href={"/login"}>
                                                        <p style={{marginTop: "10px"}}>ユ―ザー作成済ですか？</p>
                                                    </Link>
                                                    <Link href={"/"}>
                                                        <p style={{marginTop: "10px"}}>トップページへ</p>
                                                    </Link>
                                                </>
                                            )
                                            : (<Link href={{pathname: `/AuthGmail/${responseUserData?.email}`}}>
                                                <button className={"submit"}>
                                                    メール認証に進む
                                                </button>
                                            </Link>)}
                                    </form>
                                </div>
                            </div>

                            <div className={"flower_img"}>
                                <Image src={"/images/flower_a.png"} alt={"背景画像"} fill objectFit="cover"/>
                            </div>


                        </div>


                </div>
            )}
        </>
    )
        ;
}


export default Register;
