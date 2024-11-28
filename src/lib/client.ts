//microcms
import {createClient} from  "microcms-js-sdk"

console.log("呼び出された")
export  const  client = createClient({
   serviceDomain:"blogtest112",//microcmsドメイン名
   apiKey:process.env.API_KEY!,
});