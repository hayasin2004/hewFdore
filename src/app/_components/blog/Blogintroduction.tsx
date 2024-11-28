import Link from "next/link";
import {client} from "@/lib/client";
//import styles from "../styles/style.css"

export  interface Blogtype{
    id?: string;
    title?: string;
    contents?: string;
    blog?:string;
}

//SSG
export const getStaticProps = async() => {
    const data : Blogtype= await client(blog);
    console.log(data)
    //console.log(data);
    return{
        props:{
            blog:data.contents,
        },
    };
};

const Blogintroduction = () => {
    console.log("呼び出してみる")
    getStaticProps()
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