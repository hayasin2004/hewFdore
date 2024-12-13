"use client";

import React, { useEffect, useState } from "react";
import { GetBlog } from "@/lib/client";
import Link from "next/link";

export interface BlogType {
    id?: string;
    title?: string;
    contents?: string;
}

const Blogintroduction = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {

        const fetchBlogs = async () => {
            const data = await GetBlog(); // データ取得
            console.log("取得したデータ:", data);
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <h1>ブログ一覧</h1>
            {blogs.length === 0 ? (
                <p>読み込み中...</p>
            ) : (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog.id}>
                            {/*各ブログの詳細ページのLink*/}
                            <Link href={`/${blog.id}`}>
                                {blog.title}

                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Blogintroduction;









// "use client";
//
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { GetBlog } from "@/lib/client";
//
// export interface Blogtype {
//     id?: string;
//     title?: string;
//     contents?: string;
// }
//
// const Blogintroduction = () => {
//     const [blogs, setBlogs] = useState<Blogtype[]>([]); // データを配列で管理
//
//     useEffect(() => {
//         const fetchBlogs = async () => {
//             const data = await GetBlog(); // データを取得
//             setBlogs(data);
//         };
//         fetchBlogs();
//     }, []);
//
//     return (
//         <div>
//             <h1>ブログ一覧</h1>
//             <ul>
//                 {blogs.map((blog) => (
//                     <li key={blog.id}>
//                         <Link href={`/blog/${blog.id}`}>
//                             <a>{blog.title}</a>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default Blogintroduction;








//↓修正前

// "use client"
//
// import Link from "next/link";
// import React, {useEffect, useState} from "react";
// import GetBlog from "@/lib/client";
// import client from "@/lib/client";
//
// //import styles from "../styles/style.css"
//
//
//
//  export interface Blogtype {
//      id?: string;
//      title?: string;
//      contents?: string;
//      blog?: string;
//  }
//
//  const Blogintroduction = () => {
//      const HikisuuTest : string = "Test"
//      const [blog, setBlog] = useState()
//      console.log((JSON.stringify(blog)))
//  //SSG
//      useEffect(() => {
//          const getStaticProps = async () => {
//              const data: Blogtype = await GetBlog();
//              setBlog(data)
//              console.log(data)
//              //console.log(data);
//              return {
//                  props: {
//                      blog: data.contents,
//                  },
//              };
//          };
//          getStaticProps()
//      }, [])
//
//
//
//      console.log("呼び出してみる")
//      return (
//          <div>
//              {/*{blog.map((blog) => (*/}
//              {/*    <li key={blog.id}>*/}
//              {/*        <Link href={`/blog/${blog.id}`}>*/}
//              {/*            <a href="">{blog.title}</a>*/}
//              {/*        </Link>*/}
//              {/*    </li>*/}
//              {/*))}*/}
//          </div>
//      );
//  }
//  export default Blogintroduction;