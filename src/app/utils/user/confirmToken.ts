"use server"

import jwt from "jsonwebtoken";

const confirmToken = async (token: string | null) => {

    const decoded: string | null = await jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
}
export default confirmToken