"use client"
import React, {useEffect, useMemo, useState} from 'react';
import CatchingUser from "@/app/_components/catchingUser/CatchingUser";
import {UserType} from "@/app/api/user/catchUser/route";
import {DBProductType} from "@/app/api/product/route";
import Link from "next/link";
import "./findall.css"
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";

// 必要があればページネーションの導入も考えた方がいいかも　
// import ReactPaginate from "react-paginate";

const Findall = () => {
    const [userList, setUserList] = useState<UserType[]>([])
    console.log("こにちは"+JSON.stringify(userList))


    useEffect(() => {
        const catchingUser = async function data() {
            const response = await fetch("/api/user/catchUser")
            const userData = await response.json();
            console.log('Fetched user data:', userData); // デバッグ用 setUserList
            setUserList(userData);
            return JSON.stringify(userList);
        }
        console.log(userList);

        catchingUser()

    }, []);


    return (
        <div id={"wrap"}>
            <Header/>
            <div id={"UserList"}>
                <h1>ユーザーリスト</h1>
                <div id={"ListDirction"}>
                {userList.map((item , index) => (
                    <table　className={"ListUser"} key={index}>
                        <tr>
                            <td className={"ListIcon"} rowSpan={3}>ここに<br/>アイコン</td>
                            <th>
                                object-id
                            </th>
                            <td className={"idLink"}>
                                <Link href={`/userDetail/${item.id}`}>{item.id}</Link>
                            </td>
                            <td className={"mailLink"} rowSpan={3}>

                                <img src="/images/mail_1.svg" width={50} height={50} alt="DM"/>
                            </td>
                        </tr>
                        <tr>
                            <th>ユーザー名</th>
                            <td>{item.username}</td>
                        </tr>
                        <tr>
                            <th>メールアドレス</th>
                            <td>{item.email}</td>
                        </tr>
                    </table>
                ))}
                </div>
            </div>
            <Footer/>
        </div>

    );
}


export default Findall;