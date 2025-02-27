"use client"
import React, {useEffect, useState} from "react";
import {data} from "@remix-run/router/utils";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";
import Link from "next/link";
import updateFollowings from "@/app/utils/user/ApdateFollowings";
import useUser from "@/hooks/useUser";
import {ProductType} from "@/app/utils/product/productDetail";
import CatchLikeList from "@/app/utils/user/CatchlikeList";
import confirmUser from "@/app/utils/user/confirmUser";
import Images from "next/image";
import "./userDetail.css"


const UserDetailPage = ({params}: { params: { id: UserType | null } }) => {
    const [userData, setUserData] = useState<UserType | null>(null)
    const [productData, setProductData] = useState<ProductType[] | null>(null)
    const [likeList, setLikeList] = useState<string[] | null>(null)
    const [loginUserData , setLoginUserData] = useState<string | null>(null)
    console.log(likeList)
    const id: UserType | null = params.id;
    const token = localStorage.getItem("token")



    const followings = async () => {
        try {
            const userFollowings: string | null = await userData?._id
            console.log(userFollowings)
            const response: string | null = await updateFollowings(userFollowings, loginUserData?._id)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const response = async () => {
            try {

                const confirmToken = await confirmUser(token)
                const confirmTokenParse = JSON.parse(confirmToken)
                setLoginUserData(confirmTokenParse)

                console.log(id)
                const response = await userProfile(id)
                const responesUserData = JSON.parse(response?.searchUser)
                const responesProductData = JSON.parse(response?.searchProduct)
                setUserData(responesUserData)
                setProductData(responesProductData)
                if (loginUserData){
                    const likeData = CatchLikeList(loginUserData?._id)
                    const likeDataParse: UserType | null = JSON.parse(likeData?.productLikeList)
                    setLikeList(likeDataParse)
                }

            } catch (err) {
                console.log(err)
            }
        }
        response()
    }, [token]);

    const [selectedTab, setSelectedTab] = useState("tab1");

    return (
        <div>
            {/*<h1>*/}
            {/*    ObjectId: {params?.id}*/}
            {/*</h1>*/}
            <div>
                <div className={"partnerProfile"}>
                    <div className={"partnerProfile img"}><Images src={userData?.profilePicture} alt={"ユーザーのプロフィール画像"} width={100}
                                           height={100}/></div>
                    {/*<li>オブジェクトID: {userData?._id}</li>*/}
                    <div className={"user"}>
                        <div>ユーザー名: {userData?.username}</div>
                        <div>ユーザーID: {userData?.userId}</div>
                    </div>

                    {/*<li>ユーザーメールアドレス: {userData?.email}</li>*/}

                    {/*<li>背景画像２: {userData?.coverProfilePicture}</li>*/}

                    {/*<p>いいねリスト</p>*/}
                    {/*/!*{likeList?.likeList}*!/*/}
                    {/*{likeList?.map((likeItem) => (*/}
                    {/*    <ul key={likeItem}>*/}
                    {/*        <Link href={`/product/${likeItem}`}>*/}
                    {/*            <li>{likeItem}</li>*/}
                    {/*        </Link>*/}
                    {/*    </ul>*/}
                    {/*))}*/}

                    <div>
                        <Link href={{
                            pathname: `/directMessage/${params.id}`,
                            query: {currentUserId: loginUserData?._id}
                        }}>
                            DM
                        </Link>
                    </div>

                    <button onClick={() => followings()}>
                        フォロー
                    </button>
                </div>



                <div className={"selfIntroduction"}>
                    自己紹介: {userData?.desc}
                </div>


                <div className={"tab_container"}>

                    <input id="tab1" type="radio" name="tab_item" defaultChecked={selectedTab === "tab1"}
                           onChange={() => setSelectedTab("tab1")}/>
                    <label className="tab_item" htmlFor="tab1">このユーザーが出品している商品</label>

                    <input id="tab2" type="radio" name="tab_item" defaultChecked={selectedTab === "tab2"}
                           onChange={() => setSelectedTab("tab2")}/>
                    <label className="tab_item" htmlFor="tab2">フォロー中</label>

                    <input id="tab3" type="radio" name="tab_item" defaultChecked={selectedTab === "tab3"}
                           onChange={() => setSelectedTab("tab3")}/>
                    <label className="tab_item" htmlFor="tab3">フォロワー</label>

                    <div className="tab_content" id="tab1_content">
                        {productData?.map((item: ProductType) => (
                            <div key={item?._id}>
                                <br/>
                                <div>商品名 : {item.productName}</div>
                                <div>商品価格 : {item.productPrice}</div>
                                <div>送料負担 : {item.postageBurden}</div>
                                <div>商品カテゴリー : {item.productCategory}</div>
                                <Images src={item?.productImage ? item?.productImage : "/"} alt={"商品画像"} width={500} height={500} />
                                <Link href={`/product/${item._id}`}>
                                    <div>詳細を見る</div>
                                </Link>
                                <br/>
                            </div>
                        ))}
                    </div>

                    <div className="tab_content" id="tab2_content">
                        {/*フォロー中*/}
                        {userData?.followers?.map((item) => (
                            <span key={item?._id}>
                            <Link href={`/${item?._id}`}><p>{item?._id}</p></Link>
                            </span>
                        ))}
                    </div>

                    <div className="tab_content" id="tab3_content">
                        {/*フォロワー一覧*/}
                        {userData?.followers?.map((item) => (
                            <span key={item?._id}>
                            <p>{item?._id}</p>
                            </span>
                        ))}
                    </div>
                </div>

                {/*<div>*/}
                {/*    <p>ログインしている人</p>*/}
                {/*    id : {loginUserData?._id} <br/>*/}
                {/*    username : {loginUserData?.username}*/}
                {/*</div>*/}

            </div>

        </div>

    )
}

export default UserDetailPage;