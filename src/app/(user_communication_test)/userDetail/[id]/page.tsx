"use client"
import {useEffect, useState} from "react";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";
import Link from "next/link";
import updateFollowings from "@/app/utils/user/ApdateFollowings";
import "./userDetail.css"
import {ProductType} from "@/app/utils/product/productDetail";
import CatchLikeList from "@/app/utils/user/CatchlikeList";
import confirmUser from "@/app/utils/user/confirmUser";
import Images from "next/image";
import "./userDetail.css"


const UserDetailPage = ({params}: { params: { id: UserType | null } }) => {
    const [userData, setUserData] = useState<UserType | null>(null)
    const [followerData, setFollowerData] = useState<UserType[] | null>(null)
    const [followingsData, setFollowingsData] = useState<UserType[] | null>(null)
    console.log(followerData)
    const [productData, setProductData] = useState<ProductType[] | null>(null)
    const [likeList, setLikeList] = useState<UserType | null>(null)
    const [loginUserData, setLoginUserData] = useState<UserType | null>(null)
    const [mainImages, setMainImages] = useState<{ [key: string]: string }>({});
    const [images, setImages] = useState<{ [key: string]: string[] }>({});
    const [selectedTab, setSelectedTab] = useState("tab1");

    console.log(images, mainImages, likeList);

    const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement>, productId: string, index: number) => {
        e.preventDefault();
        setMainImages(prevState => ({
            ...prevState,
            [productId]: images[productId][index]
        }));
    };

    console.log(handleImageClick);
    const id = params.id;
    const token = localStorage.getItem("token");

    const followings = async () => {
        try {
            const userFollowings: string | undefined = await userData?._id;
            console.log(userFollowings);
            const response = await updateFollowings(userFollowings, loginUserData?._id);
            console.log(response);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const response = async () => {
            try {
                const confirmToken = await confirmUser(token!);
                const confirmTokenParse = JSON.parse(confirmToken!);
                setLoginUserData(confirmTokenParse);

                console.log(id);
                const response = await userProfile(id);
                if (response !== undefined && response !== null) {
                    const responesUserData = JSON.parse(response?.searchUser);
                    const responceFollowerData = JSON.parse((response?.followers));
                    const responesFollowingsData = JSON.parse(response?.followings);
                    const responesProductData: ProductType[] = JSON.parse(response?.searchProduct);
                    setUserData(responesUserData);
                    setFollowerData(JSON.parse(responceFollowerData));
                    setFollowingsData(JSON.parse(responesFollowingsData));
                    setProductData(responesProductData);
                    const newMainImages: { [key: string]: string } = {};
                    const newImages: { [key: string]: string[] } = {};
                    responesProductData.forEach(product => {
                        if (product._id !== undefined) {
                            newMainImages[product._id] = product.productImage;
                            newImages[product._id] = [
                                product.productImage,
                                product.productImage2 || "",
                                product.productImage3 || "",
                                product.productImage4 || ""
                            ];
                        }
                    });
                    setMainImages(newMainImages);
                    setImages(newImages);
                    if (loginUserData) {
                        const likeData = await CatchLikeList(loginUserData?._id);
                        if (likeData) {
                            const likeDataParse = JSON.parse(likeData.likeList);
                            setLikeList(likeDataParse);
                        }
                    }

                }
            } catch (err) {
                console.log(err)
            }
        }
        response()
    }, [token, loginUserData, id]);
    return (
        <div>
            {/*<h1>*/}
            {/*    ObjectId: {params?.id}*/}
            {/*</h1>*/}
            <div>
                <div className={"partnerProfile"}>
                    <div className={"partnerProfileImg"}><Images
                        src={userData?.profilePicture !== "" && userData?.profilePicture !== undefined ? userData?.profilePicture : "/profile.png"}
                        alt={"ユーザーのプロフィール画像"} width={100}
                        height={100}/>
                    </div>
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
                            <ul key={item?._id}>
                                <br/>
                                <div>商品名 : {item.productName}</div>
                                <div>商品価格 : {item.productPrice}</div>
                                <div>送料負担 : {item.postageBurden}</div>
                                <div>商品カテゴリー : {item.productCategory}</div>
                                <Images src={item?.productImage ? item?.productImage : "/"} alt={"商品画像"}
                                        width={300} height={300}/>
                                <Link href={`/product/${item._id}`}>
                                    <div>詳細を見る</div>
                                </Link>
                                <br/>
                            </ul>
                        ))}
                    </div>

                    <div className="tab_content" id="tab2_content">
                        {/*フォロー一覧*/}
                        {followingsData?.map((item: UserType) => (
                            <ul key={item._id}>
                                <Images className={"img2"}
                                        src={item.profilePicture !== undefined ? item.profilePicture : "/profile.png"}
                                        width={100} height={100} alt={"プロフィール画像"}/>
                                <li className={"name2"}>{item.username}</li>
                            </ul>
                        ))}
                    </div>

                    <div className="tab_content" id="tab3_content">
                        {/*フォロワー一覧*/}
                        {followerData?.map((item: UserType) => (
                            <ul key={item._id}>
                                <Images className={"img3"}
                                        src={item.profilePicture !== undefined ? item.profilePicture : "/profile.png"}
                                        width={100} height={100} alt={"プロフィール画像"}/>
                                <li className={"name3"}>{item.username}</li>
                            </ul>
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