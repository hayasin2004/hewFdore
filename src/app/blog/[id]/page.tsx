import client from "@/lib/client";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;
    const data = await client.get({ endpoint: "blogs", contentId: id });

    return {
        props: {
            blog: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await client.get({ endpoint: "blogs" });
    const paths = data.contents.map((content: { id: string }) => ({
        params: { id: content.id },
    }));

    return {
        paths,
        fallback: false,
    };
};

const BlogId = ({ blog }: { blog: any }) => {
    return (
        <main>
            <h1>{blog.title}</h1>
            <p>{blog.publishedAt}</p>
            <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
            {/*dangerouslySetInnerHTMLは非推奨*/}
        </main>
    );
};

export default BlogId;







//修正前

// //[id]/pages.tsx
// import client from "@/lib/client";
// import {Blog} from "../../../../public/types/blogtype";
// import React from "react";
//
//
//
//
//  //SSG
//  export const getStaticProps = async () => {
//      const id = context.params.id;
//      const data = await client.get({ endpoint:"blog", contentId: id});
//
//      return{
//          props:{
//              blog:data,
//          },
//      };
//  };
//
//  export const getStaticPaths = async () => {
//      const data = await client.get ({endpoint:"blogs"});
//
//      const paths = data.contents.map((content) => `/blog/${content.id}`);
//      return{
//          paths,
//          fallback:false,//`/blog/${content.id}`で設定していないパスは404エラーを出す
//      };
//  };
//
//
//  export default function BligId({params}:{params:{blog?:string}})  {
//      console.log(params);
//      return(
//
//          <main >
//
//              {/*<h1 >{params?.blog?.title}</h1>*/}
//              {/*<p>{blog.publishedAt}</p>*/}
//              {/*<div*/}
//              {/*    dangerouslySetInnerHTML={{ __html: `${blog.body}` }}*/}
//              {/*></div>*/}
//          </main>
//      );
//  }