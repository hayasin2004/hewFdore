"use client"
import React, {useEffect, useState} from "react";
import userProfile from "@/app/utils/user/userProfile";
import {UserType} from "@/app/api/user/catchUser/route";
import Link from "next/link";
import updateFollowings from "@/app/utils/user/ApdateFollowings";
import {ProductType} from "@/app/utils/product/productDetail";
import CatchLikeList from "@/app/utils/user/CatchlikeList";
import confirmUser from "@/app/utils/user/confirmUser";
import Images from "next/image";
import Image from "next/image";


const UserDetailPage = ({params}: { params: { id: UserType | null } }) => {

    const [userData, setUserData] = useState<UserType | null>(null)
    const [productData, setProductData] = useState<ProductType[] | null>(null)
    const [likeList, setLikeList] = useState<string[] | null>(null)
    const [loginUserData , setLoginUserData] = useState<string | null>(null)
    const [mainImages, setMainImages] = useState<{ [key: string]: string }>({});
    const [images, setImages] = useState<{ [key: string]: string[] }>({});

    console.log(images, mainImages);

    const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement>, productId: string, index: number) => {
        e.preventDefault();
        setMainImages(prevState => ({
            ...prevState,
            [productId]: images[productId][index]
        }));
    };

    console.log(likeList);
    const id: UserType | null = params.id;
    const token = localStorage.getItem("token");

    const followings = async () => {
        try {
            const userFollowings: string | null = await userData?._id;
            console.log(userFollowings);
            const response: string | null = await updateFollowings(userFollowings, loginUserData?._id);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const response = async () => {
            try {
                const confirmToken = await confirmUser(token);
                const confirmTokenParse = JSON.parse(confirmToken);
                setLoginUserData(confirmTokenParse);

                console.log(id);
                const response = await userProfile(id);
                const responesUserData = JSON.parse(response?.searchUser);
                const responesProductData: ProductType[] = JSON.parse(response?.searchProduct);
                setUserData(responesUserData);
                setProductData(responesProductData);
                const newMainImages: { [key: string]: string } = {};
                const newImages: { [key: string]: string[] } = {};
                responesProductData.forEach(product => {
                    newMainImages[product._id] = product.productImage;
                    newImages[product._id] = [
                        product.productImage,
                        product.productImage2 || "",
                        product.productImage3 || "",
                        product.productImage4 || ""
                    ];
                });
                setMainImages(newMainImages);
                setImages(newImages);
                if (loginUserData) {
                    const likeData = CatchLikeList(loginUserData?._id);
                    const likeDataParse: UserType | null = JSON.parse(likeData?.productLikeList);
                    setLikeList(likeDataParse);
                }

            } catch (err) {
                console.log(err);
            }
        };
        response();
    }, [token]);

    return (
        <div>
            <h1>
                ObjectId: {params?.id}
            </h1>
            <div>
                <ul style={{display: "flex", flexDirection: "column"}}>
                    <li>オブジェクトID: {userData?._id}</li>
                    <li>ユーザーID: {userData?.userId}</li>
                    <li>ユーザー名: {userData?.username}</li>
                    <li>ユーザーメールアドレス: {userData?.email}</li>
                    <li>ユーザー自己紹介: {userData?.desc}</li>
                    <li>背景画像１:<Images src={userData?.profilePicture} alt={"ユーザーのプロフィール画像"} width={100} height={100}/> </li>
                    <li>背景画像２: {userData?.coverProfilePicture}</li>


                    <p>いいねリスト</p>
                    {likeList?.map((likeItem) => (
                        <ul key={likeItem}>
                            <Link href={`/product/${likeItem}`}>
                                <li>{likeItem}</li>
                            </Link>
                        </ul>
                    ))}

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
                            <p>{item?._id}</p>
                            </span>
                ))}

                    <li>
                        <Link href={{pathname: `/directMessage/${params.id}`, query: {currentUserId: loginUserData?._id}}}>
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

                                <div id="photo">
                                    <figure>
                                        <Image src={mainImages[item._id] !== undefined ? mainImages[item._id] : "/images/clothes/product.jpg"}
                                               width={200} height={200}
                                               alt="商品の写真"/>
                                    </figure>
                                    <ul className="piclist">
                                        {images[item._id] && images[item._id].map((image, index) => (
                                            <li key={index} className="picts">
                                                {image ? (
                                                    <a href="#" onClick={(e) => handleImageClick(e, item._id, index)}>
                                                        <Image className="pictS" src={image} width={50} height={50}
                                                               alt={`画像${index + 1}`}/>
                                                    </a>
                                                ) : null}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                    id : {loginUserData?._id} <br/>
                    username : {loginUserData?.username}
                </div>

            </div>

        </div>

    )
}

export default UserDetailPage;
