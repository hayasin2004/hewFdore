"use server"

import {string} from "prop-types";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {MongoClient} from "mongodb";

import {Server} from "socket.io";
import mongoose from "mongoose";
import {Chat} from "@/models/Chat";

const DirectMessageserver = async (detailUser?: string, currentUser?: string) => {

    await connectDB()
    const uri = process.env.MONGODB_URI!;
    const client = new MongoClient(uri)
    try {
        const database = client.db("Chat");
        const collection = database.collection("currentUser");
        const changeStream = collection.watch()
        changeStream.on("change", (change) => {
            console.log("change", change);
        })
        console.log("erxtcyvugbijomkp" + currentUser)
        const partnerUserData = await User.findById({_id: detailUser});
        const currentUserData = await User.findById({_id: currentUser});
        // console.log("対象のユーザー" + partnerUserData);
        // console.log("ログインしているユーザー" + currentUserData);
    } catch (err) {
        console.log(err)
    }
}
export default DirectMessageserver
