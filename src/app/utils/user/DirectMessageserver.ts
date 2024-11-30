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
            console.log("既に作られています")
            return null
        } else {
            const currentUserData = await User.findById({_id: currentUser}).select("username email profilePicture coverProfilePicture");
            const partnerUserData = await User.findById({_id: detailUser}).select(" username email profilePicture coverProfilePicture");
            console.log("useEffectがかわった" + partnerUserData);
            const newChatId = uuidv4()
            const newChatRoom = await Chat.create({
                ChatroomId: newChatId,
                currentUser: currentUser,
                partnerUser: detailUser
            })
            newChatRoom.save()
            console.log("作られてないので新しく作成しました。")
            const chatCurrentUser = await Chat.findById({currentUser: currentUserData._id})
            const chatPartnerUser = await Chat.findById({partnerUserChat: partnerUserData._id})
        }


        // 新しいチャット作成の処理
        //既にcurrentUser , detailUserのペアが作られているかどうか


        const partnerUserChat = await Chat.create({
            currentUser: currentUserData.username,
            partnerUser: partnerUserData.username
        });

        // console.log("対象のユーザー" + partnerUserData);
        // console.log("ログインしているユーザー" + currentUserData);
        return {partnerUser: JSON.stringify(partnerUserData), currentUser: JSON.stringify(currentUserData)}
    } catch (err) {
        console.log(err)
        return null
    }
}
export default DirectMessageserver
