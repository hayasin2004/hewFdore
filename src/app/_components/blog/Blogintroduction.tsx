"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import GetBlog from "@/lib/client";

//import styles from "../styles/style.css"

export interface Blogtype {
    id?: string;
    title?: string;
    contents?: string;
    blog?: string;
}

const Blogintroduction = () => {
    const HikisuuTest : string = "Test"
    const [blog, setBlog] = useState()
    console.log((JSON.stringify(blog)))
//SSG
    useEffect(() => {
        const getStaticProps = async () => {
            const data: Blogtype = await GetBlog();
            setBlog(data)
            console.log(data)
            //console.log(data);
            return {
                props: {
                    blog: data.contents,
                },
            };
        };
        getStaticProps()
    }, [])

    console.log("呼び出してみる")
    return (
        <div>
            {/*{blog.map((blog) => (*/}
            {/*    <li key={blog.id}>*/}
            {/*        <Link href={`/blog/${blog.id}`}>*/}
            {/*            <a href="">{blog.title}</a>*/}
            {/*        </Link>*/}
            {/*    </li>*/}
            {/*))}*/}
        </div>
    );
}
export default Blogintroduction;