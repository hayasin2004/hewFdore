"use client"
import React, {useState} from 'react';
import confirmUser from "@/app/utils/confirmUser";

interface User {
    token: string;
    username: string;
    email : string;
    userId: string;
}

const UseUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const token = localStorage.getItem("token");
    if (token) {
        (async () => {
            const userData = await confirmUser(token);
            console.log(userData)
            setUser(userData)
            if (userData !== null) {
                setUser(userData)
            } else {
                console.log("トークンが確認できませんでした。")
            }
        })()

}
    return (
        <>
        </>
    );
};

export default UseUser;