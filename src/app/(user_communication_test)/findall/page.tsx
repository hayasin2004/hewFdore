"use client"
import React, {useEffect, useMemo, useState} from 'react';
import CatchingUser from "@/app/_components/catchingUser/CatchingUser";
import {UserType} from "@/app/api/catchUser/route";
import {DBProductType} from "@/app/api/product/route";


const Findall = () => {
    const [userList, setUserList] = useState<UserType[]>([])
    console.log("こにちは"+JSON.stringify(userList))


    useEffect(() => {
        const catchingUser = async function data() {
            const response = await fetch("/api/catchUser")
            const userData = await response.json();
            console.log('Fetched user data:', userData); // デバッグ用 setUserList
            setUserList(userData);
            return JSON.stringify(userList);
        }
        console.log(userList);

        catchingUser()

    }, []);



    return (
        <div>
            <div>
                ここに表示
                {userList.map((item , index) => (
                    <ul key={index}>
                        <li>これはMongodbのobjectId : {item.id}</li>
                        <li>これはユーザー名 : {item.username}</li>
                        <li>これはメールアドレス : {item.email}</li>
                        <br/>
                    </ul>
                ))}
            </div>
        </div>
    );
}


export default Findall;