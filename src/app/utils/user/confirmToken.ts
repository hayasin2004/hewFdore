"use server"

import {string} from "prop-types";
import jwt from "jsonwebtoken";

const confirmToken = async (token: string | null) => {
    //console.log(token);

    const decoded: string | null = await jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
}
export default confirmToken