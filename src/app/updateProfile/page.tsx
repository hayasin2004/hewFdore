"use client"
import React, {useState} from 'react';
import Header from "@/app/_components/header/Header";
import Image from "next/image"
import "./updateProfile.css"
import userInfoChange from "@/app/utils/user/userInfoChange";
import useUser from "@/hooks/useUser";

const UpdateProfile = () => {
    const {user} = useUser()
    const userId = user?.userId
    const [username, setUsername] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [email, setEmail] = useState<string | null>("")
    const [address, setAddress] = useState<string | null>("")
    const [description, setDescription] = useState<string | null>("")

    const changeUserInfo = async () => {
        const response = await userInfoChange(
            userId,
            username,
            password,
            email,
            address,
            description
        )

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
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200}
                               alt={"ユーザーのプロフィール"}/>

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
                            <form>
                                <label id={"Name"} htmlFor="UserName">Masataka</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder="新しいユーザー名" onChange={(e) => {
                                    setUsername(e.target.value)
                                }}/><br/>
                                <label htmlFor="Email">Email</label><br/>
                                <input type="text" name="Email" id="Email"
                                       placeholder="Eメールアドレス" onChange={(e) => {
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
                                       placeholder="住所を入力して下さい。" onChange={(e) => {
                                    setAddress(e.target.value)
                                }}/><br/>
                                <label htmlFor="UserName">自己紹介</label><br/>
                                <input type="text" name="UserName" id="UserName"
                                       placeholder="自己紹介文を入力してください。" onChange={(e) => {
                                    setDescription(e.target.value)
                                }}/><br/>
                                <button type="submit" onClick={changeUserInfo}>更新する</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default UpdateProfile;