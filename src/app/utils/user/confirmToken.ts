"use server"

import jwt from "jsonwebtoken";

const confirmToken = async (token: string | null) => {
    try {

    if (token !== null){

    const decoded = await jwt.verify(token, process.env.SECRET_KEY!);
    return decoded;
    }
    }catch (err){
        console.log(err)
        return  null
    }
}
export default confirmToken