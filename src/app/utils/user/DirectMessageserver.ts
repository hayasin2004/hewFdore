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


const DirectMessageserver = async (tokenUser?: string, detailUser?: string) => {
    //console.log(detailUser+ "詳細")
    await connectDB()
    try {
        // 同じObjectIdだったときの処理
        if (tokenUser === detailUser) {
            //console.log("currentUserとdetailUserが同じであるためチャットをさくせいすることができません")
            return {tokenUser};
        }
        // 既にチャットがあるかどうかの処理
        const chatExists = await Chat.findOne({
            currentUser: tokenUser,
            partnerUser: detailUser
        })
        const chatExistsPart2 = await Chat.findOne({
            currentUser: detailUser,
            partnerUser: tokenUser
        })
        //console.log(chatExists?._id)
        if (chatExists) {
            const chatId = chatExists._id
            //console.log("ここがアンディファインド"+chatId)　
            // const currentUser = tokenUser
            // const partnerUser = detailUser
            //console.log("既にcurrentUser , detailUserのチャットルームが作られています")
            // const returnUserData = async () => {
                const currentUserData : UserType | null = await User.findById({_id: tokenUser}).select("username email profilePicture coverProfilePicture").exec();
                const partnerUserData : UserType | null= await User.findById({_id: detailUser}).select(" username email profilePicture coverProfilePicture").exec();
            // //console.log("うけとり" + currentUserData)
            // return {currentUser: currentUserData?._id, partnerUser: partnerUserData?._id}
            return {status:"chatExists" , chatId : JSON.stringify(chatExists) , currentUser : JSON.stringify(currentUserData)  , partnerUser : JSON.stringify(partnerUserData)}

        } else if (chatExistsPart2) {
            const chatId = chatExistsPart2._id
            //console.log(chatId)
            const currentUser = detailUser
            const partnerUser = currentUser
            const currentUserData: UserType | null = await User.findById({_id: currentUser}).select("username email profilePicture coverProfilePicture").exec();
            const partnerUserData: UserType | null = await User.findById({_id: partnerUser}).select(" username email profilePicture coverProfilePicture").exec();


            return { status:"chatExistsPart2", chatId : JSON.stringify(chatExistsPart2) , currentUser : JSON.stringify(currentUserData)  , partnerUser : JSON.stringify(partnerUserData)}
        } else {
            const newChatId = uuidv4()
            if (tokenUser && detailUser) {
                const newChatRoom = await Chat.create({
                    ChatroomId: newChatId,
                    currentUser: tokenUser,
                    partnerUser: detailUser
                })
                newChatRoom.save()
                return {status : "newChatRoom" , newChatRoom}
            }
        }
    } catch
        (err) {
        console.log(err)
        return null
    }
}
export default DirectMessageserver
