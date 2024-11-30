"use server"

import {string} from "prop-types";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {MongoClient} from "mongodb";

import {Server} from "socket.io";
import mongoose from "mongoose";
import {Chat, ChatType} from "@/models/Chat";
import {UserType} from "@/app/api/user/catchUser/route";
import {v4 as uuidv4} from 'uuid';


const DirectMessageserver = async (detailUser?: string, tokenUser?: string) => {
    await connectDB()
    console.log("erxtcyvugbijomkp" + tokenUser)
    try {
        // 同じObjectIdだったときの処理
        if (tokenUser === detailUser) {
            console.log("currentUserとdetailUserが同じであるためチャットをさくせいすることができません")
            return {tokenUser};
        }
        // 既にチャットがあるかどうかの処理
        const chatExists = await Chat.findOne({
            currentUser: tokenUser as ChatType | null,
            partnerUser: detailUser as ChatType | null
        }).exec()
        if (chatExists) {
            console.log("既にcurrentUser , detailUserのチャットルームが作られています")
            const currentUserData   = await User.findById({_id: tokenUser}).select("username email profilePicture coverProfilePicture").exec();
            const partnerUserData   = await User.findById({_id: detailUser}).select(" username email profilePicture coverProfilePicture").exec();

            return {currentUser :currentUserData , partnerUser : partnerUserData}
        } else {
            const newChatId = uuidv4()
            const newChatRoom = await Chat.create({
                ChatroomId: newChatId,
                currentUser: tokenUser,
                partnerUser: detailUser
            })
            newChatRoom.save()
            return {newChatRoom}
        }
    } catch
        (err) {
        console.log(err)
        return null
    }
}
export default DirectMessageserver
