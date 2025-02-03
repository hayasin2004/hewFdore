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

    await connectDB()
    try {
        if (tokenUser === detailUser) {
             return {tokenUser};
        }
          const chatExists = await Chat.findOne({
            currentUser: tokenUser,
            partnerUser: detailUser
        })
        const chatExistsPart2 = await Chat.findOne({
            currentUser: detailUser,
            partnerUser: tokenUser
        })
         if (chatExists) {
            const chatId = chatExists._id
            const currentUser = tokenUser
            const partnerUser = detailUser
               return {chatExists: {chatId : chatId , currentUser : currentUser  , partnerUser : partnerUser}}

        } else if (chatExistsPart2) {
            const chatId = chatExistsPart2._id
            const currentUser = tokenUser
            const partnerUser = detailUser
            return {chatExistsPart2: {chatId : chatId , currentUser : currentUser  , partnerUser : partnerUser}}
        } else {
            const newChatId = uuidv4()
            if (tokenUser && detailUser) {

                const newChatRoom = await Chat.create({
                    ChatroomId: newChatId,
                    currentUser: tokenUser,
                    partnerUser: detailUser
                })
                newChatRoom.save()
                return {newChatRoom}
            }
        }
    } catch
        (err) {
        console.log(err)
        return null
    }
}
export default DirectMessageserver
