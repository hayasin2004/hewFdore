"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Image from "next/image"
import "./updateProfile.css"
import userInfoChange from "@/app/utils/user/userInfoChange";
import deleteAccount from "@/app/utils/user/deleteAccount";
import confirmUser from "@/app/utils/user/confirmUser";

import Link from "next/link";
import Footer from "@/app/_components/footer/Footer";

const UpdateProfile = () => {
    const [userId, setUserId] = useState<string | null>("")
    const [username, setUsername] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [email, setEmail] = useState<string | null>("")
    const [address, setAddress] = useState<string | null>("")
    const [description, setDescription] = useState<string | null>("")
    const [profilePicture, setProfilePicture] = useState<string | null>("")
    const [newProfilePicture, setNewProfilePicture] = useState<string | null>("")
    console.log(newProfilePicture ,email)
    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {

        if (typeof window !== "undefined") {
            // Your code that accesses localStorage
            const data = localStorage.getItem("token");
            setToken(data)
        }
    }, []);
    const profilePictureFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0]
            const render = new FileReader()
            render.onloadend = () => {
                setNewProfilePicture(render.result as string)
            }
            render.readAsDataURL(file)
        }
    };

    useEffect(() => {
        const userData = async () => {
            const response = await confirmUser(token!)
            if (response) {
                const responseParse = JSON.parse(response)
                console.log(responseParse)
                setUserId(responseParse._id)
                setUsername(responseParse?.username)
                setEmail(responseParse?.email)
                setPassword(responseParse?.password)
                setAddress(responseParse?.address)
                setDescription(responseParse?.desc)
                setProfilePicture(responseParse.profilePicture)
                console.log(responseParse._id)
            }

        }
        userData()
    }, [token]);

    const changeUserInfo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const existToken = localStorage.getItem("token")
        localStorage.removeItem("token")
        if (newProfilePicture == "") {
            const response = await userInfoChange(
                userId,
                username,
                password,
                address,
                description,
                profilePicture,
                existToken
            )
            console.log("token" + response)
            if (response?.status == "existUsername") {
                if (existToken !== null) {
                    const setToken = localStorage.setItem("token", existToken)
                    console.log("既存のトークン" + setToken)
                    window.alert("そのユーザー名は既に使われています。")
                    return;

                }
            }
            if (response?.status == "successChangingData") {
                console.log(response.NewToken)
                const setNewToken = localStorage.setItem("token", JSON.parse(JSON.stringify(response.NewToken)))
                console.log("新しいトークン" + setNewToken)
                return;
            }
        } else {
            
            const response = await userInfoChange(
                userId,
                username,
                password,
                email,
                address,
                description,
                newProfilePicture
            )
            console.log("token" + response)
            if (response?.status == "existEmailOrPassword") {
                if (existToken !== null) {
                    const setToken = localStorage.setItem("token", existToken)
                    console.log("既存のトークン" + setToken)
                    return;
                }
            }
            if (response?.status == "successChangingData") {
                const setNewToken = localStorage.setItem("token", JSON.parse(JSON.stringify(response.NewToken)))
                console.log("新しいトークン" + setNewToken)
                return;
            }
        }

    }

    const deleteUser = async () => {
        const response = await deleteAccount(userId)
        if (response?.status == "delete") {
            window.alert("削除が完了しました。")
            localStorage.removeItem("token")
            window.location.href = ("/")
        }
    }


    return (
        <>
            <Header/>

            <div id={"bread"}>
                <Link href={"/"}><p className={"breadText"}>F&apos;dore</p></Link>
                <p className={"breadArrow"}>＞</p>
                <Link href={"confirmUser"}><p className={"breadText"}>プロフィール</p></Link>
                <p className={"breadArrow"}>＞</p>
                <Link href={"/"}><p className={"breadText"}>お気に入り</p></Link>

            </div>
            <div className={"updateProfile_Text"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-user-cog" id={"arrow"}>
                    <circle cx="18" cy="15" r="3" />
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M10 15H6a4 4 0 0 0-4 4v2"/>
                    <path d="m21.7 16.4-.9-.3"/>
                    <path d="m15.2 13.9-.9-.3"/>
                    <path d="m16.6 18.7.3-.9"/>
                    <path d="m19.1 12.2.3-.9"/>
                    <path d="m19.6 18.7-.4-1"/>
                    <path d="m16.8 12.3-.4-1"/>
                    <path d="m14.3 16.6 1-.4"/>
                    <path d="m20.7 13.8 1-.4"/>
                </svg>
                <h1>ユ―ザー情報更新</h1>
            </div>
            <div className={"enterUpdateUserProfile"}>

                <div className={"updateProfile_img"}>

                    <div className={"profile_img"}>
                        <Image src={profilePicture !== null ? profilePicture : "/images/clothes/product.jpg"}
                               width={200} height={200}
                               alt={"ユーザーのプロフィール"}/>

                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-move-right">
                            <path d="M18 8L22 12L18 16"/>
                            <path d="M2 12H22"/>
                        </svg>
                        <div>
                            {newProfilePicture &&
                                <Image src={newProfilePicture} width={200} height={200}
                                       alt={"ユーザーのプロフィール"}/>
                            }
                            {/*<Image src={"/images/clothes/product.jpg"} width={377} height={377} alt={"商品がないとき"}/>*/}

                        </div>
                        <input type="file" onChange={profilePictureFunc}/>
                    </div>
                </div>

                <div className={"updateProfile_user"}>
                    <form>
                                <label id={"Name"} htmlFor="UserName">Masataka</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder={username !== null ? username : "新しいユーザー名"} onChange={(e) => {
                                    setUsername(e.target.value)
                                }}/><br/>

                                {/*<label htmlFor="Email">Email</label><br/>*/}
                                {/*<input type="text" name="Email" id="Email"*/}
                                {/*       placeholder={email !== "" ? email : "Eメールアドレス"} onChange={(e) => {*/}
                                {/*    setEmail(e.target.value)*/}
                                {/*}}/><br/>*/}
                                <label htmlFor="Password">パスワード</label><br/>
                                <input type="password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} name="Password" id="Password" placeholder="パスワード"/><br/>
                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" name="PWCheck" id="PWCheck"
                                       placeholder="パスワードを再入力 "/><br/>
                                <label htmlFor="Address">住所入力</label><br/>
                                <input type="text" name="UserName" id="Address"
                                       placeholder={address !== null ? address : "住所を入力して下さい。"}
                                       onChange={(e) => {
                                           setAddress(e.target.value)
                                       }}/><br/>
                                <label htmlFor="UserName">自己紹介</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder={description !== null ? description : "自己紹介文を入力してください。"}
                                       onChange={(e) => {
                                           setDescription(e.target.value)
                                       }}/><br/>
                                <button type="submit" className={"UPbtn"}
                                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => changeUserInfo(e)}>更新する
                                </button>
                            </form>
                    <button type="submit" className={"UPbtn"} id={"delete"} onClick={deleteUser}>ユーザーを削除する</button>

                </div>
            </div>
            <Footer/>

        </>
    );
}


export default UpdateProfile;