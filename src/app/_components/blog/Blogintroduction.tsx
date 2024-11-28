import Link from "next/link";
//import styles from "../styles/style.css"

//SSG
export const getStaticProps = async() => {
    const data = await client.get({ endpoint: "blog"  });
    //console.log(data);
    return{
        props:{
            blog:data.contents,
        },
    };
};

export default function Home(){
    return <div>
        {blog.map((blog) => (
            <li key={blog.id}>
                <Link href = {`blog/${blog.id}`}>
                    <a href="">{blog.title}</a>
                </Link>
            </li>
        ))}
        <div>;
            }