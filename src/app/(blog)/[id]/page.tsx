
import {createClient} from "microcms-js-sdk";
import {notFound} from "next/navigation";
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
        const blog = await client.get({ endpoint: "blogs", contentId: id });

        return (
            <main className={"blog-id"}>
                <div className={"blog-titles"}>
                    <h1 className={"blogTitle"}>{blog.title}</h1>
                    <p className={"blogCreatedAt"}>{formatDate(blog.createdAt)}</p>
                </div>
                {/*brogintroductionの画像を大きく表示する予定*/}

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








