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


const DirectMessageserver = async (detailUser?: string, currentUser?: string): Promise<ChatType | null> => {
    await connectDB()
    console.log("erxtcyvugbijomkp" + currentUser)
    try {
        // 同じObjectIdだったときの処理
        if (currentUser === detailUser) {
            console.log("currentUserとdetailUserが同じであるためチャットをさくせいすることができません")
            return null
        }
        // 既にチャットがあるかどうかの処理
        const chatExists = await Chat.findOne({
            currentUser: currentUser,
            partnerUser: detailUser
        })
        if (chatExists) {
            console.log("既にcurrentUser , detailUserのチャットルームが作られています")
            return null
        } else {
            const currentUserData = await User.findById({_id: currentUser}).select("username email profilePicture coverProfilePicture");
            const partnerUserData = await User.findById({_id: detailUser}).select(" username email profilePicture coverProfilePicture");
            const newChatId = uuidv4()
            const newChatRoom = await Chat.create({
                ChatroomId: newChatId,
                currentUser: currentUser,
                partnerUser: detailUser
            })
            newChatRoom.save()
            return {newChatRoom: newChatRoom}
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default DirectMessageserver
