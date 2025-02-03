"use client"
import React, {useEffect , useState} from 'react';
import {UserType} from "@/app/api/user/catchUser/route";
import Link from "next/link";


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
        <div>
            <div>
                ここに表示
                {userList.map((item , index) => (
                    <ul key={index}>
                        <li>これはMongodbのobjectId :
                            <Link href={`/userDetail/${item.id}`}>
                            {item.id}
                            </Link>
                        </li>
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