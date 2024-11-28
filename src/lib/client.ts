//microcms
import {createClient} from  "microcms-js-sdk"

export  const  client = createClient({
   serviceDomain:"blogtest112",//microcmsドメイン名
   API_KEY:process.env.API_KEY,
});