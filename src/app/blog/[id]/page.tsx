//[id].js
import{client} from "@/lib/client";


//SSG
export const getStaticProps = async () => {
    const id = context.params.id;
    const data = await client.get({ endpoint:"blog", contentId: id});

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


export default function BligId({params}:{params:{blog?:string}})  {
    console.log(params);
    return(

        <main >

            {/*<h1 >{params?.blog?.title}</h1>*/}
            {/*<p>{blog.publishedAt}</p>*/}
            {/*<div*/}
            {/*    dangerouslySetInnerHTML={{ __html: `${blog.body}` }}*/}
            {/*></div>*/}
        </main>
    );
}