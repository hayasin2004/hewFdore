//[id].js
import{client} from "@/lib/client";

//SSG
export const getStaticProps = async () => {
    const id = context.params.id;
    const data = await Client.get({ endpoint:"blog", contextId: id});

    return{
        props:{
            blog:data,
        },
    };
};

export const getStaticPaths = async () => {
    const data await client.get ({endpoint:"blog"});

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return{
        paths,
        fallback:false,//`/blog/${content.id}`で設定していないパスは404エラーを出す
    };
};


export default function BligId({blog}) {
    return(
        <main>
            <h1>{blog.title}<h1>
                <p>{blog.publishedAt}</p>
                <div dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
                <main>
                    )


                    }