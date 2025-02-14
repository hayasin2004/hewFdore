import { createClient } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import Link from "next/link";
import "./blog_id.css";

const client = createClient({
    serviceDomain: "blogtest112",
    apiKey: process.env.API_KEY!,
});

// 日付フォーマット
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
};


export async function generateStaticParams() {
    const data = await client.get({ endpoint: "blogs" });
    return data.contents.map((content: { id: string }) => ({
        id: content.id,

    }));
}

async function BlogIdPage({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const blog = await client.get({ endpoint: "blogs", contentId: id,queries: { t: new Date().getTime() } });

        return (
            <main className={"blog-id"}>
                <div className={"blog-titles"}>
                    <h1>{blog.title}</h1>
                    <p>{formatDate(blog.createdAt)}</p>
                </div>


                <div className={"black-body"}>
                    <div className={"body-content"}>
                        <div className={"blog-body"} dangerouslySetInnerHTML={{__html: blog.body}}></div>


                    </div>
                    {/* dangerouslySetInnerHTMLの使用はセキュリティ上非推奨 */}
                    <div className={"linkbtn"}>
                        <Link href={"/blogintroduction"}>戻る</Link>
                    </div>

                </div>


            </main>
        );
    } catch (error) {
        console.error("ブログの取得ができませんでした:", error);
        notFound();
    }
}

export default BlogIdPage;








// // [id]/page.tsx
// import "./blog_id.css?=v3";
// import { createClient } from "microcms-js-sdk";
// import { notFound } from "next/navigation";
// import Link from "next/link";
//
//
// const client = createClient({
//     serviceDomain: "blogtest112",
//     apiKey: process.env.API_KEY!,
// });
//
// const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return ""; // dateStringがundefinedの場合は空文字を返す
//     const date = new Date(dateString);
//     return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
//         .getDate()
//         .toString()
//         .padStart(2, "0")}`;
// };
//
//
//
// export async function generateStaticParams() {
//     const data = await client.get({ endpoint: "blogs" });
//     return data.contents.map((content: { id: string }) => ({
//         id: content.id,
//     }));
// }
//
//  async function BlogIdPage({ params }: { params: { id: string } }) {
//     const { id } = params;
//
//     try {
//         const blog = await client.get({ endpoint: "blogs", contentId: id });
//
//         return (
//             <main className={"blog-id"}>
//                 <div className={"blog-title"}>
//                     <h1>{blog.title}</h1>
//                     <p>{formatDate(blog.createdAt)}</p>
//                 </div>
//
//                 {/*<p>{blog.subtitle}</p>*/}
//
//                 <div className="body-content">
//                     {/* 画像部分（最初の <figure> を抽出） */}
//                     <div className="blog-image"
//                          dangerouslySetInnerHTML={{__html: blog.body.match(/<figure>.*?<\/figure>/s)?.[0] || ""}}></div>
//
//                     {/* テキスト部分（<figure> を削除した残りの本文） */}
//                     <div className="blog-text"
//                          dangerouslySetInnerHTML={{__html: blog.body.replace(/<figure>.*?<\/figure>/s, "")}}></div>
//                 </div>
//
//
//                 {/*<div className={"body-content"}>*/}
//                 {/*    <div className={"blog-body"} dangerouslySetInnerHTML={{__html: blog.body}}></div>*/}
//                 {/*</div>*/}
//                 {/* dangerouslySetInnerHTMLの使用はセキュリティ上非推奨 */}
//
//
//
//                 <div className={"linkbtn"}>
//                     <Link href={"/blogintroduction"}>戻る</Link>
//                 </div>
//
//             </main>
//         )
//             ;
//     } catch (error) {
//         console.error("ブログの取得ができませんでした:", error);
//         notFound();
//     }
//  }
//
// export default BlogIdPage;