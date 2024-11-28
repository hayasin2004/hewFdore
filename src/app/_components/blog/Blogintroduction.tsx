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
    const data : Blogtype= await client.get({ endpoint: "blog"  });
    //console.log(data);
    return{
        props:{
            blog:data.contents,
        },
    };
};

export default function Home({ blog }) {
    return (
        <div>
            {blog.map((blog) => (
                <li key={blog.id}>
                    <Link href={`blog/${blog.id}`}>
                        <a href="">{blog.title}</a>
                    </Link>
                </li>
            ))}
        </div>
    );
}