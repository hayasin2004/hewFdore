"use client"
import React, {useState} from 'react';
import Header from "@/app/_components/header/Header";
import Image from "next/image"
import "./updateProfile.css"
const UpdateProfile = () => {
    return (
        <>
            <Header/>
            <div className={"updateProfile_Text"}>
                <h1>ユ―ザー情報更新画面</h1>
            </div>
            <div className={"enterUpdateUserProfile"}>

                <p>
                    プロフィール画面を変更する
                </p>
                <div className={"updateProfile_img"}>

                    <div className={"profile_img"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"ユーザーのプロフィール"}/>

                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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
                                <label htmlFor="UserName">ユーザー名 Masataka</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder="新しユーザー名を入力して下さい。"/><br/>
                                <label htmlFor="UserName">自己紹介</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder="自己紹介文を入力してください。"/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email"
                                       placeholder="Enter your E-mail Address"/><br/>
                                <label htmlFor="Password">パスワード</label><br/>
                                <input type="password" name="Password" id="Password" placeholder="Enter Password"/><br/>
                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" name="PWCheck" id="PWCheck" placeholder="Enter Password again "/><br/>
                                <label htmlFor="PWCheck">住所入力</label><br/>
                                <input type="text" name="UserName" id="Address"
                                       placeholder="配達お届け住所を入力して下さい。"/><br/>
                                <button type="submit">更新する</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default UpdateProfile;