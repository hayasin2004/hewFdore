"use client"
import {useEffect, useState} from "react";
import {data} from "@remix-run/router/utils";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";
import Link from "next/link";
import updateFollowings from "@/app/utils/user/ApdateFollowings";
import useUser from "@/hooks/useUser";
import {ProductType} from "@/app/utils/product/productDetail";


const UserDetailPage = ({params}: { params: { id: string |null } }) => {
    const [userData, setUserData] = useState<UserType | null>(null)
    const [productData, setProductData] = useState<ProductType[] | null>(null)
    console.log(userData?.followers)
    const id: string |null = params.id;
    const {user} = useUser()
    const loginNowUserId:string|null = user?._id


    const followings = async () => {
        try {
            const userFollowings: string | null = await userData?._id
            console.log(userFollowings)
            const response: string | null = await updateFollowings(userFollowings, loginNowUserId)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const response = async () => {
            try {
                console.log(id)
                const response = await userProfile(id)
                const responesUserData = JSON.parse(response?.searchUser)
                const responesProductData = JSON.parse(response?.searchProduct)
                setUserData(responesUserData)
                setProductData(responesProductData)
            } catch (err) {
                console.log(err)
            }
        }
        response()
    }, []);


    return (
        <div>
            <h1>
                ObjectId: {params.id}
            </h1>
            <div>
                <ul style={{display: "flex", flexDirection: "column"}}>
                    <li>オブジェクトID: {userData?._id}</li>
                    <li>ユーザーID: {userData?.userId}</li>
                    <li>ユーザー名: {userData?.username}</li>
                    <li>ユーザーメールアドレス: {userData?.email}</li>
                    <li>ユーザー自己紹介: {userData?.desc}</li>
                    <li>背景画像１: {userData?.profilePicture}</li>
                    <li>背景画像２: {userData?.coverProfilePicture}</li>
                    <li>フォロワー一覧:
                        フォロー中 : {userData?.followers?.map((item) => (
                            <span key={item?._id}>
                            <Link href={`/${item?._id}`}><p>{item?._id}</p></Link>
                            </span>
                        ))}
                        <button onClick={() => followings()}>
                            フォローする
                        </button>
                    </li>
                    フォロワー: {userData?.followers?.map((item) => (
                    <span key={item?._id}>
                            <p>{item}</p>
                            </span>
                ))}
                    <li>
                        <Link href={{pathname: `/directMessage/${params.id}`, query: {currentUserId: loginNowUserId}}}>
                            DMする
                        </Link>
                    </li>
                </ul>
                <div>
                    <h3>このユーザーが出品している商品</h3>
                    <div>
                        {productData?.map((item: ProductType) => (
                            <ul key={item?._id}>
                                <br/>
                                <li>商品名 : {item.productName}</li>
                                <li>商品価格 : {item.productPrice}</li>
                                <li>送料負担 : {item.postageBurden}</li>
                                <li>商品カテゴリー : {item.productCategory}</li>
                                <Link href={`/product/${item._id}`}>
                                    <li>詳細を見る</li>
                                </Link>
                                <br/>
                                <hr/>
                            </ul>
                        ))}
                    </div>
                </div>

                <div>
                    <p>ログインしている人</p>
                    id : {user?._id} <br/>
                    username : {user?.username}
                </div>

            </div>

        </div>

    )
}

export default UserDetailPage;