"use server"
import {NextApiRequest} from "next";
import {NextResponse} from "next/server";
import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(productId : string, res: NextResponse) {
        await connectDB()

        const product = await Product.findOne({ _id: productId });





}