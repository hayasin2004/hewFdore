"use client"
import {useEffect, useState} from "react";
import {data} from "@remix-run/router/utils";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";

const UserDetailPage = ({params}: { params: { id: string } }) => {
    const [userData, setUserData] = useState<UserType[]>([])

    const id = params.id;
    console.log("取得してきた" + id);

    useEffect(() => {
        const response = async function data() {
            const searchUser :UserType= await userProfile(id)
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
                {userData.map((item) => (
                    <ul key={item._id}>
                        <li>ユーザーId : {item.userId}</li>
                        <li>ユーザー名 : {item.username}</li>
                        <li>ユーザー名 : {item.email}</li>
                    </ul>
                ))}
            </div>

        </div>

    )
}

export default UserDetailPage;