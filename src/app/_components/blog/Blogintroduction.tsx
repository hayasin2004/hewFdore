"use client"

import React, { useEffect, useState } from "react";
import Header from "@/app/_components/header/Header";
import { GetBlog } from "@/lib/client";
import Link from "next/link";
import "./Blogintroduction.css";

export interface BlogType {
    id?: string;
    title?: string;
    contents?: string;
    sabtitle?: string;
    image?: {
        url: string;
        height: number;
        width: number;
    };
    createdAt?: string;
}

const Blogintroduction = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [visibleCount, setVisibleCount] = useState(12);
    const [showScrollButton, setShowScrollButton] = useState(false); // ← 追加
    const [showFilter, setShowFilter] = useState(false);


    // ブログデータ取得
    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await GetBlog();
            console.log("取得したブログデータ:", data);
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    // ブログデータをフィルタリング
    useEffect(() => {
        const filtered = blogs.filter((blog) => {
            if (!blog.createdAt) return false;
            const date = new Date(blog.createdAt);
            const isYearMatch = selectedYear === "all" || date.getFullYear() === Number(selectedYear);
            const isMonthMatch = selectedMonth === "all" || date.getMonth() + 1 === Number(selectedMonth);
            return isYearMatch && isMonthMatch;
        });
        setFilteredBlogs(filtered);
        setVisibleCount(12);
    }, [blogs, selectedYear, selectedMonth]);

    // スクロールイベントでボタン表示を制御
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 日付フォーマット関数
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
            .getDate()
            .toString()
            .padStart(2, "0")}`;
    };

    // トップにスクロールする関数
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <div className={"hednav"}>
                <Header/>
            </div>

            <h1 className={"title-h1"}>ブログ一覧</h1>

            {/* 絞り込み機能 */}
            <div className="filter-wrapper">
                {/* 絞り込みボタン（ヘッダーから少し下に配置） */}
                <button className="filter-toggle" onClick={() => setShowFilter(true)}>
                    絞り込み
                </button>

                {showFilter && (
                    <div className="modal-overlay" onClick={() => setShowFilter(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={() => setShowFilter(false)}>✖️</button>
                            <h2 className="filter-title">絞り込み</h2>

                            {/* 年選択ボタン */}
                            <div className="filter-group">
                                <label className="filter-label">年</label>
                                <div className="button-group">
                                    {["2024", "2025"].map((year) => (
                                        <button
                                            key={year}
                                            className={`filter-btn ${selectedYear === year ? "active" : ""}`}
                                            onClick={() => setSelectedYear(year)}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                    <button
                                        className={`filter-btn ${selectedYear === "all" ? "active" : ""}`}
                                        onClick={() => setSelectedYear("all")}
                                    >
                                        ALL
                                    </button>
                                </div>
                            </div>

                            {/* 月選択ボタン */}
                            <div className="filter-group">
                                <label className="filter-label">月</label>
                                <div className="button-group">
                                    {[...Array(12)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`filter-btn ${selectedMonth === (i + 1).toString() ? "active" : ""}`}
                                            onClick={() => setSelectedMonth((i + 1).toString())}
                                        >
                                            {i + 1}月
                                        </button>
                                    ))}
                                    <button
                                        className={`filter-btn ${selectedMonth === "all" ? "active" : ""}`}
                                        onClick={() => setSelectedMonth("all")}
                                    >
                                        ALL
                                    </button>
                                </div>
                            </div>

                            {/* リセットボタン */}
                            <div className="button-group">
                                <button
                                    className="reset-btn"
                                    onClick={() => {
                                        setSelectedYear("all");
                                        setSelectedMonth("all");
                                    }}
                                >
                                    リセット
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            {/*/!* 絞り込み機能 *!/*/}
            {/*<div className="filter-wrapper">*/}
            {/*    <button className="filter-toggle" onClick={() => setShowFilter(!showFilter)}>*/}
            {/*        {showFilter ? "▲ 絞り込みを閉じる" : "▼ 絞り込みを表示"}*/}
            {/*    </button>*/}

            {/*    {showFilter && (*/}
            {/*        <div className="filter-container">*/}
            {/*            <h2 className="filter-title">🔍 絞り込み</h2>*/}
            {/*            <div className="filter-content">*/}
            {/*                <div className="filter-group">*/}
            {/*                    <label className="filter-label">年:</label>*/}
            {/*                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="filter-select">*/}
            {/*                        <option value="all">全て</option>*/}
            {/*                        <option value="2024">2024</option>*/}
            {/*                        <option value="2025">2025</option>*/}
            {/*                    </select>*/}
            {/*                </div>*/}

            {/*                <div className="filter-group">*/}
            {/*                    <label className="filter-label">月:</label>*/}
            {/*                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="filter-select">*/}
            {/*                        <option value="all">全て</option>*/}
            {/*                        {[...Array(12)].map((_, i) => (*/}
            {/*                            <option key={i + 1} value={i + 1}>{i + 1}月</option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/* ブログ件数 */}
            <div className="blog-count">
                <p>ブログ件数: <span className="count-number">{filteredBlogs.length}</span> 件</p>
            </div>


            {filteredBlogs.length === 0 ? (
                <div className={"lender"}><p>該当するブログがありません。</p></div>
            ) : (
                <>
                    <ul className="backmain">
                        {filteredBlogs.slice(0, visibleCount).map((blog) => (
                            <li key={blog.id} className="blog-item">
                                <Link href={`/${blog.id}`} className="blog-link">
                                    {blog.image && (
                                        <img src={blog.image.url} alt={blog.title} className="blog-image"/>
                                    )}
                                    <div className="text-container">
                                        <div className="blog-date">{formatDate(blog.createdAt)}</div>
                                        <div className="linkid">{blog.title}</div>
                                        <div className="sub-text">{blog.sabtitle}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {filteredBlogs.length > visibleCount && (
                        <div className="more-button-container">
                            <button onClick={() => setVisibleCount(filteredBlogs.length)} className="more-button">
                                もっと見る
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* トップに戻るボタン */}
            {showScrollButton && (
                <button
                    className="page-top"
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
                    TOP
                </button>

            )}
        </div>
    );
};

export default Blogintroduction;


//変更前↓

// "use client";
//
// import React, { useEffect, useState } from "react";
// import Header from "@/app/_components/header/Header";
// import { GetBlog } from "@/lib/client";
// import Link from "next/link";
// import "./Blogintroduction.css";
//
// export interface BlogType {
//     id?: string;
//     title?: string;
//     contents?: string;
//     sabtitle?: string;
//     image?: {
//         url: string;
//         height: number;
//         width: number;
//     };
//     createdAt?: string;
// }
//
// const Blogintroduction = () => {
//     const [blogs, setBlogs] = useState<BlogType[]>([]);
//     const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
//     const [selectedYear, setSelectedYear] = useState("all"); // "all"が全て表示を意味する
//     const [selectedMonth, setSelectedMonth] = useState("all"); // "all"が全て表示を意味する
//
//     useEffect(() => {
//         const fetchBlogs = async () => {
//             const data = await GetBlog(); // データ取得
//             console.log("取得したデータ:", data);
//             setBlogs(data);
//         };
//         fetchBlogs();
//     }, []);
//
//     useEffect(() => {
//         // フィルタリング条件
//         const filterBlogsByDate = blogs.filter((blog) => {
//             if (!blog.createdAt) return false; // 日付がない場合は除外
//             const date = new Date(blog.createdAt);
//
//             // 年または月が "all" の場合は条件を無視して全てを表示
//             const isYearMatch = selectedYear === "all" || date.getFullYear() === Number(selectedYear);
//             const isMonthMatch = selectedMonth === "all" || date.getMonth() + 1 === Number(selectedMonth);
//             return isYearMatch && isMonthMatch;
//         });
//         setFilteredBlogs(filterBlogsByDate);
//     }, [blogs, selectedYear, selectedMonth]); // blogs, selectedYear, selectedMonthが変更されたら再フィルタリング
//
//     const formatDate = (dateString: string | undefined): string => {
//         if (!dateString) return ""; // dateStringがundefinedの場合は空文字を返す
//         const date = new Date(dateString);
//         return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
//             .getDate()
//             .toString()
//             .padStart(2, "0")}`;
//     };
//
//
//     return (
//         <div>
//             <Header/>
//             <h1>ブログ一覧</h1>
//
//             {/* 年と月の選択 */}
//             <div style={{ marginBottom: "20px" }}>
//                 <label>
//                     年:
//                     <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//                         <option value="all">全て</option> {/* 全て表示 */}
//                         <option value="2024">2024</option>
//                         <option value="2025">2025</option>
//                     </select>
//                 </label>
//                 <label style={{ marginLeft: "10px" }}>
//                     月:
//                     <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//                         <option value="all">全て</option> {/* 全て表示 */}
//                         <option value="1">1月</option>
//                         <option value="2">2月</option>
//                         <option value="3">3月</option>
//                         <option value="4">4月</option>
//                         <option value="5">5月</option>
//                         <option value="6">6月</option>
//                         <option value="7">7月</option>
//                         <option value="8">8月</option>
//                         <option value="9">9月</option>
//                         <option value="10">10月</option>
//                         <option value="11">11月</option>
//                         <option value="12">12月</option>
//                     </select>
//                 </label>
//             </div>
//
//
//             <p>ブログ件数: {filteredBlogs.length}件</p>
//
//             {filteredBlogs.length === 0 ? (
//                 <div className={"lender"}><p>該当するブログがありません。</p></div>
//             ) : (
//                 <ul className="backmain">
//                     {filteredBlogs.map((blog) => (
//                         <li key={blog.id} className="blog-item">
//                             <Link href={`/${blog.id}`} className="blog-link">
//                                 {/* 画像 */}
//                                 {blog.image && (
//                                     <img src={blog.image.url} alt={blog.title} className="blog-image" />
//                                 )}
//                                 {/* 日付・タイトル・サブタイトル */}
//                                 <div className="text-container">
//                                     <div className="blog-date">{formatDate(blog.createdAt)}</div>
//                                     <div className="linkid">{blog.title}</div>
//                                     <div className="sub-text">{blog.sabtitle}</div>
//                                 </div>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };
//
// export default Blogintroduction;






//修正前

// "use client";
//
// import React, { useEffect, useState } from "react";
// import { GetBlog } from "@/lib/client";
// import Link from "next/link";
// import "./Blogintroduction.css";
//
// export interface BlogType {
//     id?: string;
//     title?: string;
//     contents?: string;
//     sabtitle?: string;
//     image?: {
//         url: string;
//         height: number;
//         width: number;
//     };
//     createdAt?: string;
// }
//
// const Blogintroduction = () => {
//     const [blogs, setBlogs] = useState<BlogType[]>([]);
//     const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
//     const [selectedYear, setSelectedYear] = useState("all"); // "all"が全て表示を意味する
//     const [selectedMonth, setSelectedMonth] = useState("all"); // "all"が全て表示を意味する
//
//     useEffect(() => {
//         const fetchBlogs = async () => {
//             const data = await GetBlog(); // データ取得
//             console.log("取得したデータ:", data);
//             setBlogs(data);
//         };
//         fetchBlogs();
//     }, []);
//
//     useEffect(() => {
//         // フィルタリング条件
//         const filterBlogsByDate = blogs.filter((blog) => {
//             if (!blog.createdAt) return false; // 日付がない場合は除外
//             const date = new Date(blog.createdAt);
//
//             // 年または月が "all" の場合は条件を無視して全てを表示
//             const isYearMatch = selectedYear === "all" || date.getFullYear() === Number(selectedYear);
//             const isMonthMatch = selectedMonth === "all" || date.getMonth() + 1 === Number(selectedMonth);
//             return isYearMatch && isMonthMatch;
//         });
//         setFilteredBlogs(filterBlogsByDate);
//     }, [blogs, selectedYear, selectedMonth]); // blogs, selectedYear, selectedMonthが変更されたら再フィルタリング
//
//     const formatDate = (dateString: string | undefined): string => {
//         if (!dateString) return ""; // dateStringがundefinedの場合は空文字を返す
//         const date = new Date(dateString);
//         return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
//             .getDate()
//             .toString()
//             .padStart(2, "0")}`;
//     };
//
//     return (
//         <div>
//             <h1>ブログ一覧</h1>
//
//             {/* 年と月の選択 */}
//             <div style={{ marginBottom: "20px" }}>
//                 <label>
//                     年:
//                     <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//                         <option value="all">全て</option> {/* 全て表示 */}
//                         <option value="2024">2024</option>
//                         <option value="2025">2025</option>
//                     </select>
//                 </label>
//                 <label style={{ marginLeft: "10px" }}>
//                     月:
//                     <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//                         <option value="all">全て</option> {/* 全て表示 */}
//                         <option value="1">1月</option>
//                         <option value="2">2月</option>
//                         <option value="3">3月</option>
//                         <option value="4">4月</option>
//                         <option value="5">5月</option>
//                         <option value="6">6月</option>
//                         <option value="7">7月</option>
//                         <option value="8">8月</option>
//                         <option value="9">9月</option>
//                         <option value="10">10月</option>
//                         <option value="11">11月</option>
//                         <option value="12">12月</option>
//                     </select>
//                 </label>
//             </div>
//
//             {/* フィルタリング後のブログ件数 */}
//             <p>ブログ件数: {filteredBlogs.length}件</p>
//
//             {filteredBlogs.length === 0 ? (
//                 <div className={"lender"}><p>該当するブログがありません。</p></div>
//             ) : (
//                 <ul>
//                     <div className={"backmain"}>
//                         {filteredBlogs.map((blog) => (
//                             <li key={blog.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//                                 {/* 各ブログの詳細ページのLink */}
//                                 <Link
//                                     href={`/${blog.id}`}
//                                     style={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         textDecoration: "none",
//                                         color: "inherit",
//                                     }}
//                                 >
//                                     {/* 画像表示 */}
//                                     {blog.image && (
//                                         <img
//                                             src={blog.image.url}
//                                             alt={blog.title}
//                                             style={{
//                                                 width: "250px",
//                                                 height: "200px",
//                                                 marginRight: "10px",
//                                                 borderRadius: "5px",
//                                             }}
//                                         />
//                                     )}
//                                     <div className={"text-container"}>
//                                         <div className={"blog-date"}>{formatDate(blog.createdAt)}</div>
//                                         <div className={"linkid"}>{blog.title}</div>
//                                     {/*  ページネーション実装予定  */}
//                                     </div>
//                                     <div className={"sub-text"}>{blog.sabtitle}</div>
//                                 </Link>
//                             </li>
//                         ))}
//                     </div>
//                 </ul>
//             )}
//         </div>
//     );
// };
//
// export default Blogintroduction;



//変更前完全

// "use client";
//
// import React, { useEffect, useState } from "react";
// import { GetBlog } from "@/lib/client";
// import Link from "next/link";
// import "./Blogintroduction.css";
//
// export interface BlogType {
//     id?: string;
//     title?: string;
//     sabtitle?: string;
//     contents?: string;
//     image?: {
//         url: string;
//         height: number;
//         width: number;
//     };
//     createdAt?: string;
// }
//
// const Blogintroduction = () => {
//     const [blogs, setBlogs] = useState<BlogType[]>([]);
//
//     useEffect(() => {
//         const fetchBlogs = async () => {
//             const data = await GetBlog(); // データ取得
//             console.log("取得したデータ:", data);
//             setBlogs(data);
//         };
//         fetchBlogs();
//     }, []);
//
//     //日付設定
//     const formatDate = (dateString: string | undefined): string => {
//         if (!dateString) return ""; // dateStringがundefinedの場合は空文字を返す
//         const date = new Date(dateString);
//         return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
//             .getDate()
//             .toString()
//             .padStart(2, "0")}`;
//     };
//
//     return (
//         <div>
//             <h1>ブログ一覧</h1>
//             <p>ブログ件数: {blogs.length}件</p>
//
//             {blogs.length === 0 ? (
//                 <p>読み込み中...</p>
//             ) : (
//                 <ul>
//                     <div className={"backmain"}>
//                         {blogs.map((blog) => (
//
//                             <li key={blog.id} className={"blog-item"}
//                                 style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
//                                 {/* 各ブログの詳細ページのLink */}
//                                 <Link href={`/${blog.id}`} style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     textDecoration: "none",
//                                     color: "inherit"
//                                 }}>
//                                     {/* 画像表示 */}
//                                     {blog.image && (
//                                         <img
//                                             src={blog.image.url}
//                                             alt={blog.title}
//                                             style={{
//                                                 width: "250px",
//                                                 height: "auto",
//                                                 marginRight: "10px",
//                                                 borderRadius: "5px",
//                                             }}
//                                         />
//                                     )}
//                                     <div className={"text-container"}>
//                                         <div className={"blog-date"}>{formatDate(blog.createdAt)}</div>
//                                         <div className={"linkid"}>{blog.title}</div>
//                                     </div>
//                                     <div className={"sab-text"}>{blog.sabtitle}</div>
//                                 </Link>
//                             </li>
//                         ))}
//                     </div>
//                 </ul>
//             )}
//
//         </div>
//     );
// };
//
// export default Blogintroduction;

