"use client"
import {useEffect, useState} from "react";
import {data} from "@remix-run/router/utils";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";
import Link from "next/link";
import updateFollowings from "@/app/utils/user/ApdateFollowings";
import useUser from "@/hooks/useUser";


const UserDetailPage = ({params}: { params: { id: string } }) => {
    const [userData, setUserData] = useState<UserType | null>()
    const {user} = useUser()
    const loginNowUserId =  user?._id
    const id = params.id;
    console.log("取得してきた" + id);

    useEffect(() => {
        const response = async function data() {
            const searchUser = await userProfile(id)
            setUserData(searchUser)
        }
        response()
    }, [id]);

    const followings = async () => {
        const userFollowings  = userData?.id
        console.log(userFollowings)
        const response = await updateFollowings(userFollowings , loginNowUserId)
        try {
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>
                ObjectId: {params.id}
            </h1>
            <div>
                <ul style={{display: "flex", flexDirection: "column"}}>
                    <li>オブジェクトID: {userData?.id}</li>
                    <li>ユーザーID: {userData?.userId}</li>
                    <li>ユーザー名: {userData?.username}</li>
                    <li>ユーザーメールアドレス: {userData?.email}</li>
                    <li>ユーザー自己紹介: {userData?.desc}</li>
                    <li>背景画像１: {userData?.profilePicture}</li>
                    <li>背景画像２: {userData?.coverProfilePicture}</li>
                    <li>フォロー一覧: {userData?.followings}
                        <button onClick={() => followings()}>
                            フォローする
                        </button>
                    </li>
                    <li>フォロワー一覧: {userData?.followers}</li>
                </ul>

                <div>
                    <p>ログインしている人</p>
                    id : {user?._id}
                    username : {user?.username}
                </div>

            </div>

        </div>

    )
}

export default UserDetailPage;