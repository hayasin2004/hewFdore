"use server"
//microcms
import {createClient} from "microcms-js-sdk"

const GetBlog = () => {
    const client = createClient({
        serviceDomain: "blogGetBlog112",//microcmsドメイン名
        apiKey: process.env.API_KEY!,
    });
    //console.log("確認"+JSON.stringify(client));
    try {

        return {client: JSON.stringify(client)}
    } catch (err) {
        //console.log(err)
    }

}

export default GetBlog;

// //console.log("呼び出された")
// export
