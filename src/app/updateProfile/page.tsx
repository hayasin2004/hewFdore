"use client"
import React, {useState} from 'react';
import Header from "@/app/_components/header/Header";
import Image from "next/image"
import "./updateProfile.css"
import Link from "next/link";
const UpdateProfile = () => {
    return (
        <>
            <Header/>
            <div className={"updateProfile_Text"}>
                <h1>ユ―ザー情報更新</h1>
            </div>
            <div className={"enterUpdateUserProfile"}>

                <div className={"updateProfile_img"}>

                    <div className={"profile_img"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"ユーザーのプロフィール"}/>

                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-move-right">
                            <path d="M18 8L22 12L18 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <div>
                            <Image src={"/images/clothes/product.jpg"} width={200} height={200}
                                   alt={"ユーザーのプロフィール"}/>
                        </div>
                    </div>
                </div>

                <div className={"updateProfile_user"}>
                    <div>
                        <div id="form">
                            <form action="../Toppage/index.html" method="post">
                                <label id={"Name"} htmlFor="UserName">Masataka</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder="新しいユーザー名"/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email"
                                       placeholder="Eメールアドレス"/><br/>
                                <label htmlFor="Password">パスワード</label><br/>
                                <input type="password" name="Password" id="Password" placeholder="パスワード"/><br/>
                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" name="PWCheck" id="PWCheck" placeholder="パスワードを再入力 "/><br/>
                                <label htmlFor="PWCheck">住所入力</label><br/>
                                <input type="text" name="UserName" id="Address"
                                       placeholder="住所を入力して下さい。"/><br/>
                                <label htmlFor="UserName">自己紹介</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder="自己紹介文を入力してください。"/><br/>
                                <button type="submit">更新する</button>
                                <Link href={"confirmUser"}><button id={"returnCU"}>戻る</button></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default UpdateProfile;