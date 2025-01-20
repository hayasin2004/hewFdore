"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Image from "next/image"
import "./updateProfile.css"
import userInfoChange from "@/app/utils/user/userInfoChange";
import useUser from "@/hooks/useUser";
import deleteAccount from "@/app/utils/user/deleteAccount";
import userDetail from "@/app/utils/user/userDetail";
import confirmUser from "@/app/utils/user/confirmUser";
import {string} from "prop-types";

const UpdateProfile = () => {
    const [userId, setUserId] = useState<string | null>("")
    const [username, setUsername] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [email, setEmail] = useState<string | null>("")
    const [address, setAddress] = useState<string | null>("")
    const [description, setDescription] = useState<string | null>("")
    const [profilePicture, setProfilePicture] = useState<string | null>("")
    const [newProfilePicture, setNewProfilePicture] = useState<string | null>("")
    console.log(username, email, password, address)
    const token = localStorage.getItem("token")

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
            const response = await confirmUser(token)
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
        localStorage.removeItem("token")
        if (newProfilePicture == "") {
            const response = await userInfoChange(
                userId,
                username,
                password,
                email,
                address,
                description,
                profilePicture
            )
            console.log("token" + response)
            if (response) {
                await localStorage.setItem("token", JSON.parse(JSON.stringify(response)))
                console.log(response)
            }
        }else {
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
            if (response) {
                await localStorage.setItem("token", JSON.parse(JSON.stringify(response)))
                console.log(response)
            }
        }

    }

    const deleteUser = async () => {
        const response = await deleteAccount(userId)
        console.log(response)
    }


    return (
        <>
            <Header/>
            <div className={"updateProfile_Text"}>
                <h1>ユ―ザー情報更新</h1>
            </div>
            <div className={"enterUpdateUserProfile"}>

                <div className={"updateProfile_img"}>

                    <div className={"profile_img"}>
                        <Image src={profilePicture !== "" ? profilePictureFunc : "/images/clothes/product.jpg"}
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
                    <div>
                        <div id="form">
                            <form>
                                <label id={"Name"} htmlFor="UserName">Masataka</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder={username !== "" ? username : "新しいユーザー名"} onChange={(e) => {
                                    setUsername(e.target.value)
                                }}/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email"
                                       placeholder={email !== "" ? email : "Eメールアドレス"} onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/><br/>
                                <label htmlFor="Password">パスワード</label><br/>
                                <input type="password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} name="Password" id="Password" placeholder="パスワード"/><br/>
                                <label htmlFor="PWCheck">パスワード(再入力)</label><br/>
                                <input type="password" name="PWCheck" id="PWCheck"
                                       placeholder="パスワードを再入力 "/><br/>
                                <label htmlFor="Address">住所入力</label><br/>
                                <input type="text" name="UserName" id="Address"
                                       placeholder={address !== "" ? address : "住所を入力して下さい。"}
                                       onChange={(e) => {
                                           setAddress(e.target.value)
                                       }}/><br/>
                                <label htmlFor="UserName">自己紹介</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder={description !== "" ? description : "自己紹介文を入力してください。"}
                                       onChange={(e) => {
                                           setDescription(e.target.value)
                                       }}/><br/>
                                <button type="submit"
                                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => changeUserInfo(e)}>更新する
                                </button>
                            </form>
                            <button type="submit" onClick={deleteUser}>ユーザーを削除する</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default UpdateProfile;