import { createClient } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import Link from "next/link";

const client = createClient({
    serviceDomain: "blogtest112",
    apiKey: process.env.API_KEY!,
});

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
            <main>
                <h1>{blog.title}</h1>
                <p>{blog.publishedAt}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
                {/* dangerouslySetInnerHTMLの使用はセキュリティ上非推奨 */}
                <Link href={"/blogintroduction"}>戻る</Link>
            </main>
        );
    } catch (error) {
        console.error("ブログの取得ができませんでした:", error);
        notFound();
    }
}
export default　BlogIdPage;