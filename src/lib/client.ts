//client.ts
"use server";

import { createClient } from "microcms-js-sdk";


const client = createClient({
    serviceDomain: "blogtest112",//サービスドメイン名
    apiKey: process.env.API_KEY!,
});


export const GetBlog = async () => {
    try {
        const data = await client.get({ endpoint: 'blogs',queries: { limit: 100 }, });
        return data.contents;
    } catch (err) {
        console.error("APIエラー:", err);
        return [];
    }
};

//デバック用
client
    .get({
        endpoint: 'blogs',
    })
    //.then((res) => console.log(res));
    .then((res) => console.log("res"+ JSON.parse(JSON.stringify(res.contents.map((item: { image: string; }) => console.log(item.image))))))
    .catch((err) => console.error("取得エラー:", err));







//↓修正前

// "use server"
// //microcms
// import {createClient} from "microcms-js-sdk";
// import  {Blog} from "../../public/types/blogtype";
//
// const GetBlog = () => {
//     const client = createClient({
//         serviceDomain: "blogGetBlog112",//microcmsドメイン名
//         apiKey: process.env.API_KEY!,
//     });
//     console.log(client);
//     try {
//
//         return {client: JSON.stringify(client)}
//     } catch (err) {
//         console.log(err)
//         return {
//             client: JSON.stringify([]),
//         };
//     }
//
// }
//
// export default GetBlog;
//
// // console.log("呼び出された")
// // export
