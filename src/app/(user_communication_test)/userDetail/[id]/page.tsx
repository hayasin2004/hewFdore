"use client"
import {useEffect, useState} from "react";
import {data} from "@remix-run/router/utils";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";

const UserDetailPage = ({params}: { params: { id: string } }) => {
    const [userData, setUserData] = useState<null | UserType>(null)

    const id = params.id;
    console.log("取得してきた" + id);

    useEffect(() => {
        const response = async function data() {
            const searchUser 　 = await userProfile(id)
            console.log("オブジェクトの型"+searchUser)
            setUserData(searchUser)
        }
        response()
    }, [id]);

    return (
        <div>
            <h1>
                ObjectId: {params.id}
            </h1>
            <div>
                        <p>ユーザーId : {userData?.userId}</p>
                        <p>ユーザーオブジェクトID : {userData?.id}</p>
                        <p>ユーザー名 : {userData?.username}</p>

            </div>

        </div>

    )
}

export default UserDetailPage;