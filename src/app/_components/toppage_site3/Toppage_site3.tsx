"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetBlog } from "@/lib/client";
import "./common.css";
import Image from "next/image";

export interface BlogType {
    id: string;
    title: string;
    createdAt: string;
    image?: {
        url: string;
    };
}

// 日付フォーマット関数
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ja-JP", options);
};

// 配列をランダムに並び替える関数
const shuffleArray = (array: BlogType[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const ToppageSite3 = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetBlog();
                console.log("取得データ:", data);
                setBlogs(shuffleArray(data || [])); // データをランダムに並び替え
            } catch (error) {
                console.error("ブログデータの取得に失敗しました", error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="siteunbermain">
            <div>
                <h2>Staff Blog</h2>
                <ul className="site3">
                    <ul>
                        <li>
                            <p className="tatemozi">Staff Blog</p>
                        </li>
                    </ul>
                    {loading ? (
                        <p>Loading...</p>
                    ) : blogs.length > 0 ? (
                        blogs.slice(0, 3).map((blog) => (
                            <li key={blog.id}>
                                <Link href={`/${blog.id}`} className="blog-link">
                                    {blog.image && (
                                        <Image
                                            src={`${blog.image.url}`}
                                            alt={blog.title}
                                            className="blog-images"
                                            width="380"
                                            height="265"
                                        />
                                    )}
                                    <div className="text-container">
                                        <div className="blog-date">{formatDate(blog.createdAt)}</div>
                                        <div className="linkids">
                                            {blog.title.length > 20 ? `${blog.title.substring(0, 20)}...` : blog.title}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>ブログ記事がありません。</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ToppageSite3;







// "use client";
//
// import React, { useEffect, useState } from "react";
// import Link from "next/link"; // 追加
// import { GetBlog } from "@/lib/client";
// import "./common.css";
//
// export interface BlogType {
//     id: string;
//     title: string;
//     sabtitle?: string; // サブタイトル追加
//     createdAt: string; // 日付追加
//     image?: {
//         url: string;
//     };
// }
//
// // 日付フォーマット関数
// const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("ja-JP", options);
// };
//
// const ToppageSite3 = () => {
//     const [blogs, setBlogs] = useState<BlogType[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await GetBlog();
//                 console.log("取得データ:", data);
//                 setBlogs(data || []);
//             } catch (error) {
//                 console.error("ブログデータの取得に失敗しました", error);
//                 setBlogs([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div className="siteunbermain">
//             <div>
//                 <h2>Staff Blog</h2>
//                 <ul className="site3">
//                     <ul>
//                         <li>
//                             <p className="tatemozi">Staff Blog</p>
//                         </li>
//                     </ul>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : blogs.length > 0 ? (
//                         blogs.slice(0, 3).map((blog) => ( // 3件に制限
//                             <li key={blog.id}>
//                                 <Link href={`/${blog.id}`} className="blog-link">
//                                     {blog.image && (
//                                         <Images
//                                             src={blog.image.url}
//                                             alt={blog.title}
//                                             className="blog-image"
//                                             width="380"
//                                             height="380"
//                                         />
//                                     )}
//                                     <div className="text-container">
//                                         <div className="blog-date">{formatDate(blog.createdAt)}</div>
//                                         <div className="linkid">
//                                             {blog.title.length > 20 ? `${blog.title.substring(0, 20)}...` : blog.title}
//                                         </div>
//                                         {/*{blog.sabtitle && <div className="sub-text">{blog.sabtitle}</div>}*/}
//                                     </div>
//                                 </Link>
//                             </li>
//                         ))
//                     ) : (
//                         <p>ブログ記事がありません。</p>
//                     )}
//                 </ul>
//             </div>
//         </div>
//     );
// };
//
// export default ToppageSite3;







// "use client";
//
// import React, { useEffect, useState } from "react";
// import { GetBlog } from "@/lib/client";
// import "./common.css";
//
// export interface BlogType {
//     id: string;
//     title: string;
//     image?: {
//         url: string;
//     };
// }
//
// const ToppageSite3 = () => {
//     const [blogs, setBlogs] = useState<BlogType[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await GetBlog();
//                 console.log("取得データ:", data);
//                 setBlogs(data || []);
//             } catch (error) {
//                 console.error("ブログデータの取得に失敗しました", error);
//                 setBlogs([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div className="siteunbermain">
//             <div>
//                 <h2>Staff Blog</h2>
//                 <ul className="site3">
//                     <ul>
//                         <li>
//                             <p className="tatemozi">Staff Blog</p>
//                         </li>
//                     </ul>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : blogs.length > 0 ? (
//                         blogs.slice(0, 3).map((blog) => ( // 3件に制限
//                             <li key={blog.id}>
//                                 {blog.image ? (
//                                     <Images
//                                         className="image"
//                                         src={blog.image.url}
//                                         width="380"
//                                         height="380"
//                                         alt={blog.title}
//                                     />
//                                 ) : (
//                                     <p>画像なし</p>
//                                 )}
//                                 <p className="blog-title">
//                                     {blog.title.length > 20 ? `${blog.title.substring(0, 20)}...` : blog.title}
//                                 </p>
//                             </li>
//                         ))
//                     ) : (
//                         <p>ブログ記事がありません。</p>
//                     )}
//                 </ul>
//             </div>
//         </div>
//     );
// };
//
// export default ToppageSite3;













//更新前

// import React from 'react';
// import Image from "next/image";
// import "./common.css"
//
// const ToppageSite3 = () => {
//     return (
//         <div className="siteunbermain">
//             <div >
//                 <h2>
//                     Staff Blog
//                 </h2>
//                 <ul className={"site3"}>
//                     <ul >
//                         <li>
//                          <p className={"tatemozi"}>
//                              Staff Blog
//                          </p>
//                         </li>
//                     </ul>
//                     <li>
//                         <Image className={"image"} src={"/images/clothes/product.jpg"} width={380} height={380}
//                             alt={"購入履歴"}/>
//                         <p>aaaaaaaaaaaa</p>
//                     </li>
//                     <li>
//                         <Image className={"image"} src={"/images/clothes/product.jpg"} width={380} height={380}
//                        alt={"購入履歴"}/>
//                         <p>bbbbbbbbbbbb</p>
//                     </li>
//                     <li>
//                         <Image className={"image"} src={"/images/clothes/product.jpg"} width={380} height={380}
//                        alt={"購入履歴"}/>
//                         <p>cccccccccccccc</p>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };
//
//
// export default ToppageSite3;